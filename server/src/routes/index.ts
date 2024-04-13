import express, { Router } from 'express';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger';
const url = '/api';

const router: Router = express.Router();

router.get('/html', async (req, res)=>{
    try {
        let {link, html} = req.query;

        // 링크를 HTML 으로 변환
        if(link && typeof link == 'string'){
            const linkHtml = (await axios.get(link)).data;
            html = linkHtml;
        }

        // console.log({key: process.env['OPENAI_API_KEY']});
        if(!html || typeof html !== 'string') throw Error;

        const url = process.env.OPENAI_API_ENDPOINT ?? "";
        const apiKey = process.env.OPENAI_API_KEY ?? "";

        const query = '탈북인들이 한국에 정착하기 위해서 중요한 사항에 대해서(쉬운 것) 랜덤으로 퀴즈와 정답을 하나씩 만들어줘. 문제는 항상 다르게. 퀴즈와 답의 구분은 퀴즈:, 답변: 문자열로 해줘 답변은 한가지 단어 단답형으로 1개의 단어만 해줘. 퀴즈의 질문은 좀더 구체적으로 해줘. 퀴즈는 딱 1개만 출제해줘.';

        const response = await axios.post(url, {
            messages: [
                { role: "system", content: "I am working on developing a system to assist North Korean defectors. The system aims to provide comprehensive support, ranging from resettlement assistance to integration services. It will feature a user-friendly interface that allows defectors to access necessary information easily, such as legal advice, job placements, and educational resources. The system will also include a secure communication platform to ensure the privacy and safety of its users. By leveraging advanced technologies, this system will help North Korean defectors adapt to their new environments and lead successful lives outside of North Korea." },
                { role: "user", content: `${query}` },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            params: {
                'api-version': '2023-05-15'
            }
        });
        const data = response?.data;
        console.log({data});

        res.send({data});
    } catch (error) {
        console.log({error});
        res.status(400).send({
            text: '토큰이 만료되었습니다.',
            error
        });
    }
});

router.get('/test', async (req, res)=>{
    try {
        let {text} = req.query;

        const url = process.env.PERSONAL_OPENAI_API_ENDPOINT ?? "";
        const apiKey = process.env.PERSONAL_API_KEY ?? "";
        
        const query = text ?? 'What are the differences between Azure Machine Learning and Azure AI services?';

        const response = await axios.post(url, {
            messages: [
                { role: "system", content: "I am working on developing a system to assist North Korean defectors. The system aims to provide comprehensive support, ranging from resettlement assistance to integration services. It will feature a user-friendly interface that allows defectors to access necessary information easily, such as legal advice, job placements, and educational resources. The system will also include a secure communication platform to ensure the privacy and safety of its users. By leveraging advanced technologies, this system will help North Korean defectors adapt to their new environments and lead successful lives outside of North Korea." },
                { role: "user", content: `${query}` },
            ],
        }, {
            headers: {
                'Content-Type': 'application/json',
                'api-key': apiKey
            },
            params: {
                'api-version': '2023-05-15' // 2023-08-01
            }
        });
        const data = response?.data;
        console.log({data});

        res.send({data});
    } catch (error) {
        logger.error('get /test catch error:', {error});
    }
});

router.get('/translate', async (req, res)=>{
    try {
        let {text} = req.query;
        
        const url = "https://api.cognitive.microsofttranslator.com" ?? "";
        const apiKey = "da619fd8c08644ec8ae855ed245ef71f" ?? "";
        const location = 'eastus2';
        console.log({url, apiKey, location});
        
        const query = text ?? 'I would really like to drive your car around the block a few times!';

        const response = await axios({
            baseURL: url,
            url: '/translate',
            method: 'post',
            headers: {
                'Ocp-Apim-Subscription-Key': apiKey,
                'Ocp-Apim-Subscription-Region': location,
                'Content-type': 'application/json',
                'X-ClientTraceId': uuidv4().toString()
            },
            params: {
                'api-version': '3.0',
                'from': 'en',
                'to': 'ko'
            },
            data: [{
                'text': query
            }],
            responseType: 'json'
        })
        const data = response?.data;
        console.log({data});

        res.send({data});
    } catch (error) {
        logger.error('get /translate catch error:', {error});
        res.send({error});
    }
});

export { router, url };