export class User{
    constructor(
        public email: string,
        public password: string,
        private Token: string,
        private tokenExpirationDate: Date ){}
    get token(){
        if(!this.tokenExpirationDate || new Date()> this.tokenExpirationDate){
            return null;
        }
        return this.Token;
    }
}