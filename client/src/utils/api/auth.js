import Cookie from 'js-cookie';

    class AuthManager {

        /*Singleton de ma classe*/

        static #instance = null;

        static getInstance() {
            if (!AuthManager.#instance) {
                AuthManager.#instance = new AuthManager();
            }
            return AuthManager.#instance;
        }

        /*Méthode de login*/

        async login(username, password) {
            return fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:'include',
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then((response) => response.json())
                .then(async (data) => {
                    if (data.status === "error") {
                        console.log(data);
                        throw new Error("Authentication failed"); // renvoyer une erreur pour rejeter la promesse
                    } else {
                        return "Authentication successful"; // renvoyer la chaîne de promesses pour résoudre la promesse
                    }
                })
                .catch((error) => {
                    console.error(error);
                    throw error; // rejeter la promesse en cas d'erreur
                });
        }

        /*Vérification si l'utilisateur est login en vérifiant
        si un token est bien enregistré localement*/
        isAuthenticated() {
            return Cookie.get('token');
        }
    }
        /*Instance de ma classe à exporter pour l'utiliser partout*/
    const authManagerInstance = new AuthManager();

    export default authManagerInstance;