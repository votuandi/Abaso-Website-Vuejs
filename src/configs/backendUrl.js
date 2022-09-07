const urls = {
    LOCALHOST_URL: 'http://localhost:8001',
    GET_ALL_PRODUCTS_PATH: '/all-products',
    GET_ALL_PRODUCTS_PATH_FULL: 'http://localhost:8001/all-products',
    GET_COUNT_SUB_BY_PID_PATH: '/subproduct/count-by-productid?pid=<$pid>',
    GET_COUNT_SUB_BY_PID_FULL_PATH: 'http://localhost:8001/subproduct/count-by-productid?pid=<$pid>',
    GET_ALL_SUB_BY_PID_PATH: '/subproduct/get-by-productid?pid=<$pid>',
    GET_ALL_SUB_BY_PID_FULL_PATH: 'http://localhost:8001/subproduct/get-by-productid?pid=<$pid>',
    CREATE_PRODUCT_PATH: '/product/',
    CREATE_PRODUCT_FULL_PATH: 'http://localhost:8001/product/',
    EDIT_PRODUCT_PATH: '/product/',
    EDIT_PRODUCT_FULL_PATH: 'http://localhost:8001/product/',
    CREATE_SUBPRODUCT_PATH: '/sub-product/',
    CREATE_SUBPRODUCT_FULL_PATH: 'http://localhost:8001/sub-product/',
    EDIT_SUBPRODUCT_PATH: '/sub-product/',
    EDIT_SUBPRODUCT_FULL_PATH: 'http://localhost:8001/sub-product/',
    DELETE_SUBPRODUCT_BY_SID_PATH: '/subproduct/remove-by-sid?sid=<$sid>',
    DELETE_SUBPRODUCT_BY_SID_FULL_PATH: 'http://localhost:8001/subproduct/remove-by-sid?sid=<$sid>',
    DELETE_SUBPRODUCT_BY_PID_PATH: '/subproduct/remove-by-pid?pid=<$pid>',
    DELETE_SUBPRODUCT_BY_PID_FULL_PATH: 'http://localhost:8001/subproduct/remove-by-pid?pid=<$pid>',
    DELETE_PRODUCT_BY_PID_PATH: '/product/remove-by-pid?pid=<$pid>',
    DELETE_PRODUCT_BY_PID_FULL_PATH: 'http://localhost:8001/product/remove-by-pid?pid=<$pid>',
}

const header = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PATCH, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
    "Content-Type": "text/json",
}

const firebaseGS = 'gs://abaso-dev.appspot.com/'

module.exports = {
    urls: urls,
    header: header,
    firebaseGS: firebaseGS
}