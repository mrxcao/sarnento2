//if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
//}
const ftp = require("basic-ftp")
const path = require("path")
const apagar = false
// const fs = require("fs")

async function deploy() {
    const client = new ftp.Client()
    client.ftp.verbose = true
    console.log(`conectando em ${process.env.FTP_HOST}`)
    try {
        await client.access({
            host: process.env.FTP_HOST,
            user: process.env.FTP_USER,
            password: process.env.FTP_PASSWORD,
            secure: false 
        })

        console.log("Conectado ao servidor FTP")

        const localPath = path.join(__dirname, "build")
        const remotePath = process.env.FTP_REMOTE_PATH

        console.log("Upload dos arquivos em andamento...")
        await uploadDirectory(client, localPath, remotePath)
        console.log("Upload concluído com sucesso")
    } catch (err) {
        console.error(err)
    }
    client.close()
}

async function uploadDirectory(client, localPath, remotePath) {
    await client.ensureDir(remotePath)
    if (apagar) await client.clearWorkingDir()
    await client.uploadFromDir(localPath)
}

deploy()