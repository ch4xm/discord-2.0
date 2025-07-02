"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegisterRoutes = RegisterRoutes;
const runtime_1 = require("@tsoa/runtime");
const controller_1 = require("./../src/auth/controller");
const auth_1 = require("./../src/auth/auth");
const expressAuthenticationRecasted = auth_1.expressAuthentication;
const models = {
    "Authenticated": {
        "dataType": "refObject",
        "properties": {
            "name": { "dataType": "string", "required": true },
            "accessToken": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
    "Email": {
        "dataType": "refAlias",
        "type": { "dataType": "string", "validators": { "pattern": { "value": ".+@.+" } } },
    },
    "Credentials": {
        "dataType": "refObject",
        "properties": {
            "email": { "ref": "Email", "required": true },
            "password": { "dataType": "string", "required": true },
        },
        "additionalProperties": false,
    },
};
const templateService = new runtime_1.ExpressTemplateService(models, { "noImplicitAdditionalProperties": "throw-on-extras", "bodyCoercion": true });
function RegisterRoutes(app) {
    const argsAuthController_login = {
        credentials: { "in": "body", "name": "credentials", "required": true, "ref": "Credentials" },
    };
    app.post('/login', ...((0, runtime_1.fetchMiddlewares)(controller_1.AuthController)), ...((0, runtime_1.fetchMiddlewares)(controller_1.AuthController.prototype.login)), async function AuthController_login(request, response, next) {
        let validatedArgs = [];
        try {
            validatedArgs = templateService.getValidatedArgs({ args: argsAuthController_login, request, response });
            const controller = new controller_1.AuthController();
            await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
            });
        }
        catch (err) {
            return next(err);
        }
    });
}
