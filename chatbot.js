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

const delay = ms => new Promise(res => setTimeout(res, ms)); // Função que cria o delay entre uma ação e outra


// Funil

client.on('message', async msg => {

    if (!sessoes[msg.from]) {
        sessoes[msg.from] = "inicio";

        setTimeout(() => {
            sessoes[msg.from] = "inicio"; // Agora sim, só executa após 30 minutos
        }, 2400000); // 40 minutos
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
                await client.sendMessage(msg.from,'*Espaço Terapia Fabrina Hanzem* agradece o seu contato. '+ name.split(" ")[0] + ' ,Informe o tipo de atendimento que deseja:\n\n1 - Particular\n2 - Convenio\n\n\nwww.espacoterapiasfh.com.br'); //Primeira mensagem de texto
                sessoes[msg.from] = "aguardando_tipo";
            }
            break;

        case "aguardando_tipo":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3120);
                await client.sendMessage(msg.from, 'Por favor envie o encaminhamento digitalizado');
                sessoes[msg.from] = "aguardando_documento";
            }
            else if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();


                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(2511);
                await client.sendMessage(msg.from, 'Informe o plano:');
                    
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(4262);
                await client.sendMessage(msg.from,  '1. Amil\n' +
                                                    '2. Bradesco saude\n' +
                                                    '3. Mediservice\n' +
                                                    '4. Golden cross\n' +
                                                    '5. Petrobras saúde\n' +
                                                    '6. Klini\n' +
                                                    '7. Porto saúde(Porto Seguro)\n' +
                                                    '8. Referenciamento Unimed');
                sessoes[msg.from] = "aguardando_plano";
            }
        break;

        case "aguardando_plano":
            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7|8)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor, envie sua carteirinha');
                sessoes[msg.from] = "aguardando_carteirinha";
            }
            break;

        case "aguardando_carteirinha":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
        
                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3222);
                await client.sendMessage(msg.from, 'Por favor, envie o encaminhamento digitalizado');
                sessoes[msg.from] = "aguardando_documento";
            }
            else if (msg.type === 'image' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(3000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3134);
                await client.sendMessage(msg.from, 'Envie a foto da carteirinha frente e costa (caso sua foto ja esteja com frente e costa digite 1 para continuar, se não mande o restante do documento');
                sessoes[msg.from] = "aguardando_costa";
            }
            break;

            case "aguardando_costa":
                if ((msg.body === '1' || msg.type === 'image') && msg.from.endsWith('@c.us')) {
                    const chat = await msg.getChat();

                    await delay(3000); //delay de 3 segundos
                    await chat.sendStateTyping(); // Simulando Digitação
                    await delay(3152);
                    await client.sendMessage(msg.from, 'Por favor, envie o encaminhamento digitalizado');
                    sessoes[msg.from] = "aguardando_documento";
                }
                break;

        case "aguardando_especialidade":

            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7|8|9)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3500);
                await client.sendMessage(msg.from, 'Informe o turno desejado:\n1. Manhã\n2. Tarde');
                sessoes[msg.from] = "aguardando_turno";
            }
            break;

        case "aguardando_documento":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(2787);
                await client.sendMessage(msg.from, 'Digite o seu cpf');
                sessoes[msg.from] = "aguardando_cpf";
            }
            break;
            
            case "aguardando_cpf":
                if (msg.body !== null && msg.body.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/i) && msg.from.endsWith('@c.us')) {
                    const chat = await msg.getChat();

                    await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                    await chat.sendStateTyping(); // Simulando Digitação
                    await delay(3023);
                    await client.sendMessage(msg.from, 'Informe o nome completo do responsavel');
                    sessoes[msg.from] = "aguardando_nome";
                }
                break;

                case "aguardando_nome":
                    if (msg.body !== null && msg.body.match(/[a-zA-Z]+/) && msg.from.endsWith('@c.us')) {
                        const chat = await msg.getChat();

                        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(2988);
                        await client.sendMessage(msg.from,'informe as especialidades');
                        await delay(3000); //delay de 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(4780);
                        await client.sendMessage(msg.from,  '1. Psicologia\n' +
                                                            '2. Fonoaudiolodia\n' +
                                                            '3. Terapia ocupacional\n' +
                                                            '4. Fisioterapia\n' +
                                                            '5. Psicopedagogia\n' +
                                                            '6. Neuropsicologia\n' +
                                                            '7. Nutrição\n' +
                                                            '8. Psicomotricidade\n' +
                                                            '9. Equipe Multidisciplinar');
                        sessoes[msg.from] = "aguardando_especialidade";
                    }
                    break;

                case "aguardando_turno":
                    if (msg.body !== null && msg.body.match(/(1|2)/i) && msg.from.endsWith('@c.us')) {
                        const chat = await msg.getChat();

                        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(3125);
                        await client.sendMessage(msg.from, 'Ao agendar uma consulta o paciente deve comparecer com 10 minutos de atencedencia e o token deve ser gerado na recepção antes da consulta.');
                        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(3746);
                        await client.sendMessage(msg.from, 'No caso de atendimento infantil e adolescente, o responsável que levar a criança deverá ter o aplicativo da operadora de saúde para a geração do token, caso contrário, não será efetivado o atendimento.');
                        await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(2677);
                        await client.sendMessage(msg.from, 'Aguarde um momento, seus dados serão confirmados e você será atendido...');
                        sessoes[msg.from] = "finalizado";
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