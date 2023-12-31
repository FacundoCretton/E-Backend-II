import { NextFunction, Request, Response } from "express";
import { ROLES } from "../helpers/constants";

export const isAdmin = (req: Request, res:Response, next:NextFunction) =>{

    const {rol} = req.body.userConfirmed;

    if (rol !== ROLES.admin){

        res.status(401).json({
            msg: " No posees beneficios de administrador"
        })
        return;
    }

    next()


}