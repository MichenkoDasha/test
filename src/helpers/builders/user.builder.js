import {faker} from '@faker-js/faker';

export class UserBuilder {
   /* constructor(){
        this.role = 'admin';
    }*/
    withEmail(email){
        this.email = email ?? faker.internet.email();
        return this;
    }

    withPassword(){
        this.password = faker.internet.password();
        return this;
    }

    withUsername(){
        this.username = faker.name.fullName({lastName: 'Bin'});
        return this;
    }

    build(){ 
        const result = {...this};
        return result;
    }
}
/*
const userBuilder = new UserBuilder();
userBuilder.withEmail().withPassword().withUsername().build(); 
/*
{email: 'gen@faker.ru', 
password: 'qwerty123', 
username: 'UserName123'}


let user = {
email: faker.internet.email(),
password: faker.internet.password(),
username: faker.name.fullName({lastName: 'Bin'}),
}*/
