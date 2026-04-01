import type { VercelRequest, VercelResponse } from '@vercel/node';
import axios from 'axios';

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

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ message: 'Method not allowed' });

  const { name, email, cellPhone, unit } = req.body;
  const selectedUnit = UNITS[unit];

  if (!selectedUnit) return res.status(400).json({ message: 'Unidade inválida' });

  const auth = Buffer.from(`${DNS}:${selectedUnit.token}`).toString('base64');

  try {
    // EVO
    const evoPromise = axios.post('https://evo-integracao-api.w12app.com.br/api/v1/prospects', {
      name, email, cellPhone: cellPhone.replace(/\D/g, ''), idBranch: selectedUnit.idBranch, marketingType: 'GOOGLE LP FLUXO'
    }, {
      headers: { 'Content-Type': 'application/json', 'Authorization': `Basic ${auth}` }
    });

    // NocoDB
    const nocoPromise = axios.post('https://app.nocodb.com/api/v2/tables/m4lk5uof9tacy23/records', {
      'Nome': name,
      'Email': email,
      'Celular': cellPhone,
      'Unidade': unit
    }, {
      headers: { 
        'xc-token': 'nrUcWLti4g7sq9DDozerYytubAt8_7lvFEw0Ek6H',
        'Content-Type': 'application/json',
        'accept': 'application/json'
      }
    });

    await Promise.allSettled([evoPromise, nocoPromise]);
    return res.status(200).json({ message: 'Lead processado' });

  } catch (error) {
    return res.status(500).json({ message: 'Erro interno' });
  }
}