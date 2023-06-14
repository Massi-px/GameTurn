
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

        async login(username, password, remember) {
            try{
            const res = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials:'include',
                body: JSON.stringify({
                    username,
                    password,
                    remember
                }),
            })
                return true;
            }catch(e){
                return false;
            }
        }

    /*Vérification si l'utilisateur est login en vérifiant
si un token est bien enregistré localement*/
    /*
    isAuthenticated() {
        const authenticationCookie = Cookie.get('Authentication');
        return !!authenticationCookie; // Convertir la valeur en booléen
    }

     */

    /*Méthode pour se déconnecter*/
    /*
    logout() {
        if (this.isAuthenticated()) {
            Cookie.remove('Authentication');
            return true;
        }
        else{
            return false;
        }
    }

     */

    // Ajoutez cette méthode dans la classe AuthManager
    getUserId() {
        return localStorage.getItem('username');
    }

    }
        /*Instance de ma classe à exporter pour l'utiliser partout*/
    const authManagerInstance = new AuthManager();

    export default authManagerInstance;