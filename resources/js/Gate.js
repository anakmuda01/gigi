export default class Gate{

    constructor(user){
        this.user = user;
    }

    isAdminOnly(){
        return this.user.type === 'admin';
    }

    isAdmin(){
        return this.user.type === 'master' || this.user.type === 'admin';
    }

    isDokter(){
      if(this.user.type === 'master' || this.user.type === 'dokter'){
          return true;
      }
    }

    isAsisten(){
        if(this.user.type === 'master' || this.user.type === 'asisten'){
            return true;
        }
      }

    isDokAs(){
        if(this.user.type === 'master' || this.user.type === 'dokter' || this.user.type === 'asisten'){
            return true;
        }
    }
}
