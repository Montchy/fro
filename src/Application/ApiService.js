import { fetchData, postData, updateData, deleteData } from './fetchAndRead';

const ENDPOINTS = {
    AUKTION_EXPONATE: '/auktion_exponate',
    AUKTIONEN: '/auktionen',
    BETREUER: '/betreuer',
    DOKUMENT: '/dokument',
    EINBRINGER: '/einbringer',
    EXPONATE: '/exponate',
    FLYWAY_SCHEMA_HISTORY: '/flyway_schema_history',
    KAEUFER: '/kaeufer',
    KAEUFER_KUENSTLERS: '/kaeufer_kuenstlers',
    KAEUFER_SPARTENINTERESSE: '/kaeufer_sparteninteresse',
    KATALOGE: '/kataloge',
    KATEGORIEN: '/kategorien',
    KUENSTE: '/kuenste',
    KUENSTLER: '/kuenstler',
    KUENSTLER_SPARTEN_KOENNEN: '/kuenstler_sparten_koennen',
    KUENSTLER_VERMITTLER: '/kuenstler_vermittler',
    MEDIEN: '/medien',
    VERMITTLER: '/vermittler',
};

class ApiService {
    static generateEndpoints() {
        const methods = {};
        Object.keys(ENDPOINTS).forEach((key) => {
            methods[`fetch${key}`] = () => fetchData(ENDPOINTS[key]);
            methods[`create${key}`] = (data) => postData(ENDPOINTS[key], data);
            methods[`update${key}`] = (data) => updateData(ENDPOINTS[key], data);
            methods[`delete${key}`] = (id) => deleteData(`${ENDPOINTS[key]}/${id}`);
        });
        return methods;
    }
}

const apiMethods = ApiService.generateEndpoints();
const ApiServiceFinal = { ...ApiService, ...apiMethods };

export default ApiServiceFinal;