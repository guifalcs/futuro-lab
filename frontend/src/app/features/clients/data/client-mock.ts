import { ISelectOption } from '../../../shared/components/select/select.component';

export interface IClient {
  id: string;
  companyName: string;
  tradeName: string;
  cnpj: string;
  stateRegistration: string;
  taxRegime: string;
  mainCnae: string;
  status: 'active' | 'inactive';
  clientSince: string;
  phone: string;
  email: string;
  whatsapp: string;
  address: {
    zipCode: string;
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
  };
  responsibleId: string;
  responsibleName: string;
  employeeCount: number;
  notes: string;
}

export const MOCK_TAX_REGIMES: ISelectOption[] = [
  { value: 'simples-nacional', label: 'Simples Nacional' },
  { value: 'lucro-presumido', label: 'Lucro Presumido' },
  { value: 'lucro-real', label: 'Lucro Real' },
  { value: 'mei', label: 'MEI' },
];

export const MOCK_CLIENTS: IClient[] = [
  {
    id: '1',
    companyName: 'Distribuidora Vale do Aço Ltda',
    tradeName: 'Vale do Aço Distribuições',
    cnpj: '12.345.678/0001-90',
    stateRegistration: '123.456.789.0012',
    taxRegime: 'Simples Nacional',
    mainCnae: '4691-5/00',
    status: 'active',
    clientSince: '2020-03-15',
    phone: '(31) 3821-1234',
    email: 'contato@valedoaco.com.br',
    whatsapp: '(31) 99876-5432',
    address: { zipCode: '35160-000', street: 'Rua Diamantina', number: '450', complement: 'Sala 3', neighborhood: 'Centro', city: 'Ipatinga', state: 'MG' },
    responsibleId: '2',
    responsibleName: 'Letícia Oliveira',
    employeeCount: 25,
    notes: 'Cliente antigo, sempre pontual com documentos.',
  },
  {
    id: '2',
    companyName: 'Padaria Pão Quente Eireli',
    tradeName: 'Padaria Pão Quente',
    cnpj: '23.456.789/0001-01',
    stateRegistration: '',
    taxRegime: 'Simples Nacional',
    mainCnae: '1091-1/02',
    status: 'active',
    clientSince: '2021-06-10',
    phone: '(31) 3822-5678',
    email: 'financeiro@paoquente.com.br',
    whatsapp: '(31) 99765-4321',
    address: { zipCode: '35162-100', street: 'Av. Pedro Linhares Gomes', number: '1200', complement: '', neighborhood: 'Iguaçu', city: 'Ipatinga', state: 'MG' },
    responsibleId: '3',
    responsibleName: 'Fernanda Costa',
    employeeCount: 12,
    notes: '',
  },
  {
    id: '3',
    companyName: 'Clínica Saúde Total SS',
    tradeName: 'Clínica Saúde Total',
    cnpj: '34.567.890/0001-12',
    stateRegistration: '',
    taxRegime: 'Lucro Presumido',
    mainCnae: '8630-5/01',
    status: 'active',
    clientSince: '2019-11-01',
    phone: '(31) 3823-9012',
    email: 'adm@saudetotal.com.br',
    whatsapp: '',
    address: { zipCode: '35164-200', street: 'Rua Caratinga', number: '88', complement: '2º andar', neighborhood: 'Cidade Nobre', city: 'Ipatinga', state: 'MG' },
    responsibleId: '5',
    responsibleName: 'Juliana Mendes',
    employeeCount: 40,
    notes: 'Folha grande, demanda alta no DP.',
  },
  {
    id: '4',
    companyName: 'Auto Peças Ipatinga Ltda',
    tradeName: 'Auto Peças Ipatinga',
    cnpj: '45.678.901/0001-23',
    stateRegistration: '234.567.890.0023',
    taxRegime: 'Simples Nacional',
    mainCnae: '4530-7/01',
    status: 'active',
    clientSince: '2022-01-20',
    phone: '(31) 3824-3456',
    email: 'contato@autopecasipa.com.br',
    whatsapp: '(31) 99654-3210',
    address: { zipCode: '35160-050', street: 'Rua Itabira', number: '330', complement: '', neighborhood: 'Centro', city: 'Ipatinga', state: 'MG' },
    responsibleId: '4',
    responsibleName: 'Ana Paula Silva',
    employeeCount: 8,
    notes: '',
  },
  {
    id: '5',
    companyName: 'Tech Solutions Ipatinga ME',
    tradeName: 'Tech Solutions',
    cnpj: '56.789.012/0001-34',
    stateRegistration: '',
    taxRegime: 'Simples Nacional',
    mainCnae: '6201-5/01',
    status: 'active',
    clientSince: '2023-04-05',
    phone: '(31) 3825-7890',
    email: 'admin@techsolutions.com.br',
    whatsapp: '(31) 99543-2109',
    address: { zipCode: '35163-300', street: 'Rua Jaguaribe', number: '55', complement: 'Sala 201', neighborhood: 'Horto', city: 'Ipatinga', state: 'MG' },
    responsibleId: '6',
    responsibleName: 'Patrícia Ramos',
    employeeCount: 5,
    notes: 'Empresa de TI, poucos funcionários.',
  },
  {
    id: '6',
    companyName: 'Construtora Horizonte Ltda',
    tradeName: 'Construtora Horizonte',
    cnpj: '67.890.123/0001-45',
    stateRegistration: '345.678.901.0034',
    taxRegime: 'Lucro Presumido',
    mainCnae: '4120-4/00',
    status: 'active',
    clientSince: '2018-08-12',
    phone: '(31) 3826-1234',
    email: 'financeiro@horizonte.eng.br',
    whatsapp: '',
    address: { zipCode: '35161-150', street: 'Av. Itália', number: '900', complement: '', neighborhood: 'Jardim Panorama', city: 'Ipatinga', state: 'MG' },
    responsibleId: '7',
    responsibleName: 'Camila Santos',
    employeeCount: 65,
    notes: 'Maior cliente do escritório. Folha complexa com muitos temporários.',
  },
  {
    id: '7',
    companyName: 'Restaurante Sabor Mineiro Ltda',
    tradeName: 'Sabor Mineiro',
    cnpj: '78.901.234/0001-56',
    stateRegistration: '',
    taxRegime: 'Simples Nacional',
    mainCnae: '5611-2/01',
    status: 'inactive',
    clientSince: '2020-05-22',
    phone: '(31) 3827-5678',
    email: 'sabormineiro@gmail.com',
    whatsapp: '(31) 99432-1098',
    address: { zipCode: '35160-080', street: 'Rua Governador Valadares', number: '120', complement: '', neighborhood: 'Centro', city: 'Ipatinga', state: 'MG' },
    responsibleId: '2',
    responsibleName: 'Letícia Oliveira',
    employeeCount: 0,
    notes: 'Encerrou atividades em 2025.',
  },
  {
    id: '8',
    companyName: 'Maria Silva',
    tradeName: 'Maria Silva MEI',
    cnpj: '89.012.345/0001-67',
    stateRegistration: '',
    taxRegime: 'MEI',
    mainCnae: '9602-5/02',
    status: 'active',
    clientSince: '2024-09-01',
    phone: '(31) 99321-0987',
    email: 'maria.silva.mei@gmail.com',
    whatsapp: '(31) 99321-0987',
    address: { zipCode: '35162-200', street: 'Rua Ouro Preto', number: '45', complement: '', neighborhood: 'Iguaçu', city: 'Ipatinga', state: 'MG' },
    responsibleId: '9',
    responsibleName: 'Beatriz Lima',
    employeeCount: 1,
    notes: 'MEI, emite uma nota por mês.',
  },
];
