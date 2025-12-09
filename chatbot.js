let sessoes = {};

// leitor de qr code
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth, Buttons, List, MessageMedia } = require('whatsapp-web.js'); // Mudança Buttons
const client = new Client({
    authStrategy: new LocalAuth(), // Define sessão para o aws
    puppeteer: {
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]
    }
});
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
            if (msg.body.match(/(ola|olá|oi|bom|boa|eae|eai|tudo|fala)/i) && msg.from.endsWith('@c.us')) {

                const chat = await msg.getChat();
        
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                const contact = await msg.getContact(); //Pegando o contato
                const name = contact.pushname; //Pegando o nome do contato
                await client.sendMessage(msg.from,'Olá ' + name.split(" ")[0] + ', Olá, sou a lucy, atendente virtual da espaço terapias Fabrina Hanzen, tudo bem? é seu primeiro atendimento\n\n1 - Sim\n2 - Não\n\n\nwww.espacoterapiasfh.com.br');
                sessoes[msg.from] = "aguardando_inicio";
            }
            break;

          case "aguardando_inicio":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Legal, bom saber que você tem interesse no nosso atendimento. agora precisamos de: laudo, encaminhamento e carteirinha');
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Vamos começar pelo seu laudo. Por favor envie o seu laudo');
                sessoes[msg.from] = "aguardando_laudo";
            }
            break;

            case "aguardando_laudo":
                if ((msg.type === 'image' || msg.type === 'document') && msg.from.endsWith('@c.us')) {
                    const chat = await msg.getChat();
                    await delay(1000);
                    await chat.sendStateTyping();
                    await delay(3000);
                    await client.sendMessage(msg.from, 'Seu laudo foi recebido com sucesso! Agora, por favor, envie a sua carteirinha.');
                    sessoes[msg.from] = "aguardando_carteirinha";
                }
                break;


            case "aguardando_documentos":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
                
        

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Vi que você mandou tudo certo, agora preciso que me diga a sua disponibilidade de horario para verificarmos se temos como te atender\n1- manhã\n2- tarde'); 
                sessoes[msg.from] = "aguardando_turno";
            }
                break;


            case "aguardando_inicio":
            if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Vi que você colocou "Não", ja é paciente\n1- Sim\n2- Não'); 
                sessoes[msg.from] = "aguardando_simnao";
            }
                break;

            
            case "aguardando_simnao":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Gostaria de falar com uma atendente ou continuar sendo atendido por mim?\n1- Continuar atendimento virtual\n2- Falar com atendente'); 
                sessoes[msg.from] = "aguardando_tipo_atendimento";
            }
            break;
            
            case "aguardando_tipo_atendimento":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(2787);
                await client.sendMessage(msg.from, 'Legal, bom saber que você tem interesse no nosso atendimento. agora precisamos de: laudo, encaminhamento e carteirinha');
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Vamos começar pelo seu laudo. Por favor envie o seu laudo');
                sessoes[msg.from] = "aguardando_laudo";
            }
            else if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                
                const chat = await msg.getChat();
        
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await client.sendMessage(msg.from,'Temos um prazo de 48h para que a atendente entre em contato com você para finalizar o atendimento'); //Primeira mensagem de texto
                sessoes[msg.from] = "finalizado";
            }
            break;
            
            case "aguardando_simnao":
            if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'ok, vimos que sua duvida é para outra questão. Pedi para que a atendente te responda. Só aguardar\n\n Lembrando que não envie outra mensagem para não sair da ordem de atendimento. obrigada');
                sessoes[msg.from] = "finalizado";
            }
            break;

        case "aguardando_tipo":
            if (msg.body !== null && msg.body === '1' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor envie o encaminhamento digitalizado\nCaso não tenha digite 0 para voltar para o começo');
                sessoes[msg.from] = "aguardando_documento";
            }

            else if (msg.body !== null && msg.body === '3' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Ao agendar uma consulta o paciente deve comparecer com 10 minutos de atencedencia e o token deve ser gerado na recepção antes da consulta.'
                                                 + ' No caso de atendimento infantil e adolescente, o responsável que levar a criança deverá ter o aplicativo da operadora de saúde para a geração do token, caso contrário, não será efetivado o atendimento.');
                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Aguarde um momento, seus dados serão confirmados e você será atendido...');
                sessoes[msg.from] = "finalizado";
            }
            
            else if (msg.body !== null && msg.body === '2' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
                    
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from,  'Informe o plano:\n' +
                                                    '1. Amil\n' +
                                                    '2. Bradesco Saúde\n' +
                                                    '3. Mediservice\n' +
                                                    '4. Golden Cross\n' +
                                                    '5. Petrobras Saúde\n' +
                                                    '6. Klini\n' + 
                                                    '7. Porto Saúde(Porto Seguro)\n' +
                                                    '8. Referenciamento Unimed');
                sessoes[msg.from] = "aguardando_plano";
            }
        break;

        case "aguardando_plano":
            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7|8)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor, envie sua carteirinha, Caso não tenha digite 0 para voltar para o começo');
                sessoes[msg.from] = "aguardando_carteirinha";
            }
            break;

        case "aguardando_carteirinha":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
        
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Por favor envie o encaminhamento digitalizado\nCaso não tenha digite 0 para voltar para o começo');
                sessoes[msg.from] = "aguardando_documento";
            }
            else if (msg.type === 'image' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Envie a foto da carteirinha frente e verso (caso sua foto ja esteja com frente e verso, digite 1 para continuar, senão, envie o restante do documento');
                sessoes[msg.from] = "aguardando_costa";
            }
            else if (msg.body !== null && msg.body === '0' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await client.sendMessage(msg.from,'Vi que você mandou tudo certo, agora preciso que me diga a sua disponibilidade de horario para verificarmos se temos como te atender\n1- manhã\n2- tarde'); //Primeira mensagem de texto
                sessoes[msg.from] = "aguardando_turno";
            }
            break;

            case "aguardando_costa":
                if ((msg.body === '1' || msg.type === 'image') && msg.from.endsWith('@c.us')) {
                    const chat = await msg.getChat();

                    await delay(1000); //delay de 3 segundos
                    await chat.sendStateTyping(); // Simulando Digitação
                    await delay(3000);
                    await client.sendMessage(msg.from, 'ok agora envie a costa do documento, caso ja tenha enviado digite 1 para continuar');
                    sessoes[msg.from] = "aguardando_documento";
                }
                break;

        case "aguardando_especialidade":

            if (msg.body !== null && msg.body.match(/(1|2|3|4|5|6|7|8|9)/i) && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();

                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000);
                await client.sendMessage(msg.from, 'Informe o turno desejado:\n1. Manhã\n2. Tarde');
                sessoes[msg.from] = "aguardando_turno";
            }
            break;

        case "aguardando_documento":
            if (msg.body !== null && msg.type === 'document' && msg.from.endsWith('@c.us')) {
                const chat = await msg.getChat();
        
                await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(2787);
                await client.sendMessage(msg.from, 'Vi que você mandou tudo certo, agora preciso que me diga a sua disponibilidade de horario para verificarmos se temos como te atender\n1- manhã\n2- tarde');
                sessoes[msg.from] = "aguardando_turno";
            }
            else if (msg.body !== null && msg.body === '0' && msg.from.endsWith('@c.us')) {
                
                const chat = await msg.getChat();
        
                await delay(1000); //delay de 3 segundos
                await chat.sendStateTyping(); // Simulando Digitação
                await delay(3000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                await client.sendMessage(msg.from,'Informe o tipo de atendimento que deseja:\n1 - Particular\n2 - Convenio\n3 - Falar com Atendente\n\n\nwww.espacoterapiasfh.com.br'); //Primeira mensagem de texto
                sessoes[msg.from] = "aguardando_tipo";
            }
            break;
            
            case "aguardando_cpf":
                if (msg.body !== null && msg.body.match(/(\d{3}\.?\d{3}\.?\d{3}-?\d{2})/i) && msg.from.endsWith('@c.us')) {
                    const chat = await msg.getChat();

                    await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                    await chat.sendStateTyping(); // Simulando Digitação
                    await delay(3023);
                    await client.sendMessage(msg.from, 'Informe o nome completo do responsavel');
                    sessoes[msg.from] = "aguardando_nome";
                }
                break;

                case "aguardando_nome":
                    if (msg.body !== null && msg.body.match(/[a-zA-Z]+/) && msg.from.endsWith('@c.us')) {
                        const chat = await msg.getChat();

                        await delay(1000); //delay de 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(3000);
                        await client.sendMessage(msg.from, 'Informe as especialidades\n' +
                                                            '1. Psicologia\n' +
                                                            '2. Fonoaudiolodia\n' +
                                                            '3. Terapia Ocupacional\n' +
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

                        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(3000);
                        await client.sendMessage(msg.from, 'Ao agendar uma consulta o paciente deve comparecer com 10 minutos de atencedencia e o token deve ser gerado na recepção antes da consulta.'
                                                         + ' No caso de atendimento infantil e adolescente, o responsável que levar a criança deverá ter o aplicativo da operadora de saúde para a geração do token, caso contrário, não será efetivado o atendimento.');
                        await delay(1000); //Delay de 3000 milisegundos mais conhecido como 3 segundos
                        await chat.sendStateTyping(); // Simulando Digitação
                        await delay(3000);
                        await client.sendMessage(msg.from, 'Temos um prazo de 48h para que a atendente entre em contato com você para finalizar o atendimento');
                        
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