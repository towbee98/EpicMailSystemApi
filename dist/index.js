"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const docs_1 = __importDefault(require("./docs"));
const database_1 = __importDefault(require("./engines/database"));
const index_1 = __importDefault(require("./routes/index"));
const errors_1 = __importDefault(require("./middlewares/errors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api/v1', index_1.default);
app.use('/api-docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(docs_1.default));
app.use('/*', (req, res) => {
    res.status(404).json({
        status: 'fail',
        message: 'Route not found',
    });
});
app.use(errors_1.default);
(0, database_1.default)((PORT) => {
    app.listen(PORT, () => {
        console.log(`Server running at port ${PORT}`);
    });
});
