import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsString, NotEquals, validateSync } from "class-validator";

//Criação da classe, do tipo do objeto que vamos criar para validar. E adicionamos os decorators necessários.
class Env {
    @IsString()
    @IsNotEmpty()
    //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
    jwtSecret: string;

    @IsString()
    @IsNotEmpty()
    //@NotEquals() Talvez adicione para não utilizar a mesma string do ambiaente de desenvolvimento.
    dbURL: string;
}



//Criando um objeto que possui um atributo com a string que está no .env, porém
//para validar se o objeto é valido (óbivo) usamos a classe acima e utilizamos o metodo plain to instance para "instanciar"
//a partir de um objeto.
export const env: Env = plainToInstance(Env, {
    dbURL: process.env.DATABASE_URL,
    jwtSecret: process.env.JWT_SECRET
})

//Médotod para validar o objeto
const errors = validateSync(env);


if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2))
} 
