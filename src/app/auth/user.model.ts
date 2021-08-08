export class User{
    constructor(
        public email:string,
        public id:string,
        public _token:string,
        public _refreshToken:string,
        public _tokenExpired:Date
    ){};

    get token(){
        
        return this._token;
    }

}