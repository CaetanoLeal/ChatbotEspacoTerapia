let sessoes = {};

// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client();
// serviço de leitura do qr code
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});
// apos isso ele diz que foi tudo certo
client.on('ready', () => {
    console.log('alright, the whatsapp is connected!');
});
// E inicializa tudo 
client.initialize();


    if (!sessoes[msg.from]) {
        sessoes[msg.from] = "inicio";
    }

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que cria o delay entre uma ação e outra

// Funil

client.on('message', async msg => {

    if (!sessoes[msg.from]) {
        sessoes[msg.from] = "inicio";
    }
    
    switch (sessoes[msg.from]) {
        case "inicio":
            if (msg.body.match(/(ola|olá|oi|bom|boa)/i) && msg.from.endsWith('@c.us')) {

                const chat = await msg.getChat();
        
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                const contact = await msg.getContact(); //Pegando o contato
                const name = contact.pushname; //Pegando o nome do contato
                await client.sendMessage(msg.from,'*Espaço Terapia Fabrina Hanzem* agradece o seu contato.'+ name.split(" ")[0] + ' Informe o tipo de atendimento:\n\n1 - Particular\n2 - Convenio'); //Primeira mensagem de texto
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(5000); //Delay de 5 segundos
                sessoes[msg.from] = "aguardando_tipo";
            }
            break;

        case "aguardando_tipo":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor envie o encaminhamento digitalizado');
                sessoes[msg.from] = "aguardando_documento";
            }
            else if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();


                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Informe o plano:');
                    
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from,  '1. amil\n' +
                                                    '2. bradesco saude\n' +
                                                    '3. mediservice\n' +
                                                    '4. golden cross\n' +
                                                    '5. petrobras saude\n' +
                                                    '6. klini\n' +
                                                    '7. porto saude');
                sessoes[msg.from] = "aguardando_plano";
            }
        break;

        case "aguardando_plano":
            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'por favor, envie sua carteirinha');
                sessoes[msg.from] = "aguardando_carteirinha";
            }
            break;

        case "aguardando_carteirinha":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
        
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor envie o encaminhamento digitalizado');
                sessoes[msg.from] = "aguardando_documento";
            }
            break;

        case "aguardando_especialidade":

            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Você sera encaminhado para o profissional selecionado');

                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from,  'Aguarde...');
                sessoes[msg.from] = "finalizado";
            }
            break;

        case "aguardando_documento":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
        
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from,'informe as especialidades');
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from,  '1. psicologia\n' +
                                                    '2. fonoaudiolodia\n' +
                                                    '3. terapia ocupacional\n' +
                                                    '4. fisioterapia\n' +
                                                    '5. psicopedagogia\n' +
                                                    '6. neuropsicologia\n' +
                                                    '7. nutrição');
                sessoes[msg.from] = "aguardando_especialidade";
            }
            break;

            case "finalizado":
                await delay(1800000); //delay de meia hora
                sessoes[msg.from] = "inicio"; // retorna tudo para o inicio
            break;
    
        default: sessoes[msg.from] = "inicio";
            break;
    }
});