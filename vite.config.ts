import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import axios from 'axios'

const DNS = "goodbe";
const UNITS: Record<string, { idBranch: number, token: string }> = {
  "Altino Arantes": { idBranch: 1, token: "406B8641-CAA9-412C-8C37-74B85A9890B3" },
  "Saúde": { idBranch: 2, token: "1470A068-AE9E-4479-8A62-9178E0463BB9" },
  "Parque das Nações": { idBranch: 3, token: "351AE51B-E409-4A16-B53D-51CC735418C5" },
  "Alto do Ipiranga": { idBranch: 4, token: "5CF613BE-0745-4EE4-B629-F3FC4E397E49" },
  "Jardins": { idBranch: 5, token: "2C8926D6-D541-413A-AE71-8B4992DE5833" },
  "Belenzinho": { idBranch: 6, token: "11F821F4-19D5-4CC3-8C5A-E22979FA8A57" },
  "Campestre": { idBranch: 7, token: "7ECD5713-7D81-4BFD-A0AC-38D14EFC526D" },
};

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'api-proxy',
      configureServer(server) {
        server.middlewares.use(async (req, res, next) => {
          if ((req.url === '/api/lead' || req.url === '/api/submit') && req.method === 'POST') {
            let body = '';
            req.on('data', chunk => { body += chunk; });
            req.on('end', async () => {
              try {
                const data = JSON.parse(body);
                const selectedUnit = UNITS[data.unit];

                if (!selectedUnit) {
                  res.statusCode = 400;
                  res.end(JSON.stringify({ message: 'Unidade inválida' }));
                  return;
                }

                const auth = Buffer.from(`${DNS}:${selectedUnit.token}`).toString('base64');
                
                // 1. EVO
                const evoPromise = axios.post('https://evo-integracao-api.w12app.com.br/api/v1/prospects', {
                  name: data.name,
                  email: data.email,
                  cellPhone: data.cellPhone.replace(/\D/g, ''),
                  idBranch: selectedUnit.idBranch,
                  marketingType: 'GOOGLE LP FLUXO'
                }, {
                  headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Basic ${auth}`
                  }
                }).catch(e => ({ error: true, msg: e.message }));

                // 2. NocoDB (Enviando como Array e com headers extras)
                const nocoPromise = axios.post('https://app.nocodb.com/api/v2/tables/m4lk5uof9tacy23/records', 
                  {
                    'Nome': data.name,
                    'Email': data.email,
                    'Celular': data.cellPhone,
                    'Unidade': data.unit
                  }, 
                  {
                    headers: {
                      'xc-token': 'nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H',
                      'Content-Type': 'application/json',
                      'accept': 'application/json'
                    }
                  }
                ).catch(e => {
                  console.error('❌ Erro Detalhado NocoDB:', e.response?.data || e.message);
                  return { error: true, details: e.response?.data };
                });

                const [evoRes, nocoRes] = await Promise.all([evoPromise, nocoPromise]);
                
                console.log('Status EVO:', (evoRes as any).error ? 'Falha' : 'Sucesso');
                console.log('Status NocoDB:', (nocoRes as any).error ? 'Falha' : 'Sucesso');

                res.statusCode = 200;
                res.setHeader('Content-Type', 'application/json');
                res.end(JSON.stringify({ 
                  message: 'Processado',
                  nocoStatus: (nocoRes as any).error ? 'error' : 'success'
                }));
              } catch (error: any) {
                res.statusCode = 500;
                res.end(JSON.stringify({ message: 'Erro interno' }));
              }
            });
          } else {
            next();
          }
        });
      }
    }
  ],
})