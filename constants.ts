import { Bloco, Bar, ChecklistItem } from './types';

export const INITIAL_CHECKLIST: ChecklistItem[] = [
  { id: '1', text: 'Documento oficial com foto', checked: false },
  { id: '2', text: 'Cartão de crédito/débito', checked: false },
  { id: '3', text: 'Dinheiro trocado', checked: false },
  { id: '4', text: 'Protetor solar', checked: false },
  { id: '5', text: 'Óculos de sol', checked: false },
  { id: '6', text: 'Garrafa de água reutilizável', checked: false },
  { id: '7', text: 'Power bank carregado', checked: false },
  { id: '8', text: 'Capa de chuva', checked: false },
];

export const BLOCOS_DATA: Bloco[] = [
  { id: '1', name: 'Galo da Madrugada', region: 'Centro Histórico', time: '09:00', crowdLevel: 'high', type: 'Rua' },
  { id: '2', name: 'Cordão da Bola Preta', region: 'Centro Histórico', time: '10:00', crowdLevel: 'high', type: 'Rua' },
  { id: '3', name: 'Sargento Pimenta', region: 'Orla Marítima', time: '14:00', crowdLevel: 'medium', type: 'Rua' },
  { id: '4', name: 'Bloco Secreto', region: 'Circuito Alternativo', time: '16:00', crowdLevel: 'low', type: 'Privado' },
  { id: '5', name: 'Vou de Táxi', region: 'Orla Marítima', time: '11:00', crowdLevel: 'medium', type: 'Rua' },
];

export const BARS_DATA: Bar[] = [
  { id: '1', name: 'Bar do Zé', category: 'Esquenta', address: 'Rua da Moeda, 123', lat: -23.55052, lng: -46.633309 },
  { id: '2', name: 'Lounge 90', category: 'After', address: 'Av. Boa Viagem, 400', lat: -23.55052, lng: -46.633309 },
  { id: '3', name: 'Toca da Cerveja', category: 'Chill', address: 'Rua Augusta, 500', lat: -23.55052, lng: -46.633309 },
];