"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CommentsModule = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var comments_service_1 = require("./comments.service");
var comments_controller_1 = require("./comments.controller");
var comments_repository_1 = require("./repositories/comments.repository");
var comment_1 = require("./entities/comment.");
var CommentsModule = /** @class */ (function () {
    function CommentsModule() {
    }
    CommentsModule = __decorate([
        common_1.Module({
            imports: [typeorm_1.TypeOrmModule.forFeature([comment_1.Comment])],
            controllers: [comments_controller_1.CommentsController],
            providers: [comments_service_1.CommentsService, comments_repository_1.CommentRepository],
            exports: [comments_service_1.CommentsService, comments_repository_1.CommentRepository]
        })
    ], CommentsModule);
    return CommentsModule;
}());
exports.CommentsModule = CommentsModule;
