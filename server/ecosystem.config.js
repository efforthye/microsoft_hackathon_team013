module.exports = {
    apps: [
        {
            name: 'nodejs', // pm2 name
            script: 'node dist/index.js', // // 앱 실행 스크립트
        },
    ]
};