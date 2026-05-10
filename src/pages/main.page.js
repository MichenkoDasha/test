export class MainPage {
constructor(page)
{
    this.page = page;

    this.signupLink = page.getByRole('link', { name: 'Sign up' });
}
async gotoRegister(  )
{
    await this.signupLink.click('https://realworld.qa.guru/');
}
async open()
{
   await this.page.goto('https://realworld.qa.guru/');
}
}

//todo


/// await page.getByRole('link', { name: 'Sign up' }).click();
// maim.gotoRegister()
/*const URL = 'https://realworld.qa.guru/';

let email = faker.internet.email();
let password = faker.internet.password();
let username = faker.name.fullName({lastName: 'Bin'});

async function gotoUrl (page){
    await page.goto(URL);
    return page;
    }*/