const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJWT = async (req = request, res = response, next) => {
    const token = req.header('x-token');


    if (!token) {
        return res.status(401).json({
            msg: ' No hay token en la peticion...'
        })
    }


    try {
        //Valida el token
        const {uid} = jwt.verify(token, process.env.SECRETKEY);


        //console.log(uid);
        const usuario = await Usuario.findByPk(uid)


        if(!usuario){
            return res.status(401).json({
                msg: 'Token no valido - usuario no existe en BD'
            })


        }


        req.usuario = usuario;


        next();


    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: ' El token no es valido...'
        })


    }




    //console.log(token);


    //next();
}
module.exports = {validarJWT}