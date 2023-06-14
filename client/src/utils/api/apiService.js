
class Api {

    constructor(){
        this.URL = 'http://localhost:8080/api'
    }

    /*Singleton de ma classe*/

    static #instance = null;
    static getInstance() {
        if (!Api.#instance) {
            Api.#instance = new Api();
        }
        return Api.#instance;
    }
    async exec(url_p, method_p, body_p = false) {
        try {
            const options = {
                method: method_p,
                headers: (method_p === 'POST' || method_p === 'PUT') ? {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                } : {},
                mode: "cors",
                credentials: 'include',
                body : body_p ? JSON.stringify(body_p) : undefined
            };

            const response = await fetch(`${this.URL}/${url_p}`, options);
            const data = await response.json();

            if (response.ok) {
                // Vérification de l'authentification si nécessaire
                //const authenticated = checkAuthentication ? this.isAuthenticated(response.status) : null;
                return data
            } else {
                //window.location.href='/'
                return false;
                //throw new Error(data.message);
            }
        } catch (error) {
            //window.location.href='/'
            return false;
            //throw new Error(error.message);
        }
    }


}
/*Instance de ma classe à exporter pour l'utiliser partout*/
const apiInstance = new Api();

export default apiInstance;