export interface Startup {
  id: string;
  name: string;
  description: string;
  category: 'Fintech' | 'Agtech' | 'Edtech' | 'Healthtech' | 'Retail' | 'Deeptech';
  lat: number;
  lng: number;
  website: string;
  connections: string[]; // ids of other startups they connect with
}

export const STARTUPS: Startup[] = [
  {
    id: '1',
    name: 'DiviBank',
    description: 'Soluções financeiras para pequenos negócios locais.',
    category: 'Fintech',
    lat: -20.143,
    lng: -44.887,
    website: 'https://divibank.com.br',
    connections: ['2', '4']
  },
  {
    id: '2',
    name: 'AgroPlus Divi',
    description: 'Inteligência artificial para produtores rurais da região.',
    category: 'Agtech',
    lat: -20.155,
    lng: -44.910,
    website: 'https://agroplus.com.br',
    connections: ['1', '3']
  },
  {
    id: '3',
    name: 'EducaDivi',
    description: 'Plataforma de ensino híbrido para escolas municipais.',
    category: 'Edtech',
    lat: -20.140,
    lng: -44.880,
    website: 'https://educadivi.com.br',
    connections: ['2', '5']
  },
  {
    id: '4',
    name: 'Saúde Conectada',
    description: 'Telemedicina e gestão hospitalar.',
    category: 'Healthtech',
    lat: -20.148,
    lng: -44.895,
    website: 'https://saudeconectada.com.br',
    connections: ['1', '5']
  },
  {
    id: '5',
    name: 'EcoRetail',
    description: 'Logística reversa para o varejo de moda de Divinópolis.',
    category: 'Retail',
    lat: -20.145,
    lng: -44.885,
    website: 'https://ecoretail.com.br',
    connections: ['3', '4']
  },
  {
    id: '6',
    name: 'DeepMiner',
    description: 'Processamento de dados de mineração em tempo real.',
    category: 'Deeptech',
    lat: -20.160,
    lng: -44.870,
    website: 'https://deepminer.com.br',
    connections: ['1', '2', '3', '4', '5']
  }
];
