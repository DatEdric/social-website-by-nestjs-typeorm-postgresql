"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.CommentsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var jwt_auth_guard_1 = require("src/common/guards/jwt-auth.guard");
var current_user_decorator_1 = require("src/common/decorators/current-user.decorator");
var get_comment_dto_1 = require("./dtos/get-comment.dto");
var class_transformer_1 = require("class-transformer");
var paginated_response_dto_1 = require("src/common/dtos/paginated-response.dto");
var create_paginated_respone_helper_1 = require("src/common/helper/create-paginated-respone.helper");
var CommentsController = /** @class */ (function () {
    function CommentsController(commentsService) {
        this.commentsService = commentsService;
    }
    CommentsController.prototype.createComment = function (user, createCommentDto) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.createComment(user, createCommentDto)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, class_transformer_1.plainToInstance(get_comment_dto_1.GetCommentDto, result, {
                                excludeExtraneousValues: true
                            })];
                }
            });
        });
    };
    CommentsController.prototype.getCommentsByPost = function (post_id, page, limit) {
        if (page === void 0) { page = 1; }
        if (limit === void 0) { limit = 10; }
        return __awaiter(this, void 0, Promise, function () {
            var comment, mapedData;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.getCommetsByPost(post_id, page, limit)];
                    case 1:
                        comment = _a.sent();
                        mapedData = class_transformer_1.plainToInstance(get_comment_dto_1.GetCommentDto, comment.data, {
                            excludeExtraneousValues: true
                        });
                        return [2 /*return*/, create_paginated_respone_helper_1.createPaginatedResponse(mapedData, comment.total, comment.page, comment.limit)];
                }
            });
        });
    };
    CommentsController.prototype.getCommentWithReplies = function (comment_id) {
        return __awaiter(this, void 0, Promise, function () {
            var comment;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.getCommentithReplies(comment_id)];
                    case 1:
                        comment = _a.sent();
                        return [2 /*return*/, class_transformer_1.plainToInstance(get_comment_dto_1.GetCommentDto, comment, {
                                excludeExtraneousValues: true
                            })];
                }
            });
        });
    };
    CommentsController.prototype.updateComment = function (comment_id, dto, user) {
        return __awaiter(this, void 0, Promise, function () {
            var updated;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.updateComment(comment_id, dto, user)];
                    case 1:
                        updated = _a.sent();
                        return [2 /*return*/, class_transformer_1.plainToInstance(get_comment_dto_1.GetCommentDto, updated, {
                                excludeExtraneousValues: true
                            })];
                }
            });
        });
    };
    CommentsController.prototype.deleteComment = function (comment_id, user) {
        return __awaiter(this, void 0, Promise, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.deleteComment(comment_id, user)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CommentsController.prototype.getReplies = function (parent_id) {
        return __awaiter(this, void 0, Promise, function () {
            var replies;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.commentsService.getReplies(parent_id)];
                    case 1:
                        replies = _a.sent();
                        return [2 /*return*/, class_transformer_1.plainToInstance(get_comment_dto_1.GetCommentDto, replies, {
                                excludeExtraneousValues: true
                            })];
                }
            });
        });
    };
    __decorate([
        common_1.Post(),
        swagger_1.ApiOperation({ summary: 'create a new comment for a post' }),
        swagger_1.ApiResponse({ status: 201, description: 'comment created' }),
        swagger_1.ApiResponse({ status: 400, description: 'invalid data' }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Body())
    ], CommentsController.prototype, "createComment");
    __decorate([
        common_1.Post('post/"post_id'),
        swagger_1.ApiOperation({ summary: 'get list comment of the post' }),
        swagger_1.ApiParam({ name: 'post_id', description: 'ID comment' }),
        swagger_1.ApiQuery({ name: 'page', required: false, type: Number, example: 1 }),
        swagger_1.ApiQuery({ name: 'limit', required: false, type: Number, example: 10 }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'The comment list has been successfully retrieved',
            type: paginated_response_dto_1.PaginatedResponseDto
        }),
        __param(0, common_1.Param('post_id')),
        __param(1, common_1.Query('page', new common_1.ParseIntPipe())),
        __param(2, common_1.Query('limit', new common_1.ParseIntPipe()))
    ], CommentsController.prototype, "getCommentsByPost");
    __decorate([
        common_1.Get(':comment_id'),
        swagger_1.ApiOperation({ summary: 'get detal 1 comment and all reply' }),
        swagger_1.ApiParam({ name: 'comment_id', description: 'ID of comment ' }),
        swagger_1.ApiResponse({ status: 200, type: get_comment_dto_1.GetCommentDto }),
        __param(0, common_1.Param('comment_id'))
    ], CommentsController.prototype, "getCommentWithReplies");
    __decorate([
        common_1.Put(':comment_id'),
        swagger_1.ApiOperation({ summary: 'Update comment content' }),
        swagger_1.ApiParam({ name: 'comment_id', description: 'ID of the comment to update' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Comment has been updated',
            type: get_comment_dto_1.GetCommentDto
        }),
        swagger_1.ApiResponse({
            status: 403,
            description: 'Forbidden - No permission to edit'
        }),
        __param(0, common_1.Param('comment_id')),
        __param(1, common_1.Body()),
        __param(2, current_user_decorator_1.CurrentUser())
    ], CommentsController.prototype, "updateComment");
    __decorate([
        common_1.Delete(':comment_id'),
        swagger_1.ApiOperation({ summary: 'Xóa mềm bình luận' }),
        swagger_1.ApiParam({ name: 'comment_id', description: 'ID của bình luận cần xóa' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Bình luận đã được xóa (soft delete)'
        }),
        swagger_1.ApiResponse({ status: 403, description: 'Không có quyền xóa' }),
        __param(0, common_1.Param('comment_id')),
        __param(1, current_user_decorator_1.CurrentUser())
    ], CommentsController.prototype, "deleteComment");
    __decorate([
        common_1.Get(':parent_id/replies'),
        swagger_1.ApiOperation({ summary: 'Lấy danh sách reply của một bình luận cha' }),
        swagger_1.ApiParam({ name: 'parent_id', description: 'ID của bình luận cha' }),
        swagger_1.ApiResponse({
            status: 200,
            description: 'Danh sách reply',
            type: [get_comment_dto_1.GetCommentDto]
        }),
        __param(0, common_1.Param('parent_id'))
    ], CommentsController.prototype, "getReplies");
    CommentsController = __decorate([
        swagger_1.ApiTags('Comments'),
        swagger_1.ApiBearerAuth(),
        common_1.UseGuards(jwt_auth_guard_1.JwtAuthGuard),
        common_1.Controller('comments')
    ], CommentsController);
    return CommentsController;
}());
exports.CommentsController = CommentsController;
