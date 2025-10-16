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
exports.FriendController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var current_user_decorator_1 = require("src/common/decorators/current-user.decorator");
var user_summary_dto_1 = require("./dto/user-summary.dto");
var friend_respone_dto_1 = require("./dto/friend-respone.dto");
var follow_respone_dto_1 = require("./dto/follow-respone.dto");
var FriendController = /** @class */ (function () {
    function FriendController(friendService) {
        this.friendService = friendService;
    }
    // 🟢 Gửi lời mời kết bạn
    FriendController.prototype.sendFriendRequest = function (user, dto) {
        return __awaiter(this, void 0, Promise, function () {
            var receiver, friend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        receiver = { id: dto.receiver_id };
                        return [4 /*yield*/, this.friendService.sendFriendRequest(user, receiver)];
                    case 1:
                        friend = _a.sent();
                        return [2 /*return*/, friend_respone_dto_1.FriendResponseDto.fromEntity(friend)];
                }
            });
        });
    };
    // 🟢 Chấp nhận lời mời kết bạn
    FriendController.prototype.acceptFriendRequest = function (user, friendId) {
        return __awaiter(this, void 0, Promise, function () {
            var friend;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.acceptFriendRequest(friendId, user)];
                    case 1:
                        friend = _a.sent();
                        return [2 /*return*/, friend_respone_dto_1.FriendResponseDto.fromEntity(friend)];
                }
            });
        });
    };
    // 🟡 Từ chối lời mời kết bạn
    FriendController.prototype.rejectFriendRequest = function (user, friendId) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.rejectFriendRequest(friendId, user)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { success: result }];
                }
            });
        });
    };
    // 🔴 Hủy kết bạn
    FriendController.prototype.unfriend = function (user, friendId) {
        return __awaiter(this, void 0, Promise, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.unfriend(user, friendId)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { success: result }];
                }
            });
        });
    };
    // 🟣 Theo dõi người dùng
    FriendController.prototype.followUser = function (follower, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var following, follow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        following = { id: userId };
                        return [4 /*yield*/, this.friendService.followUser(follower, following)];
                    case 1:
                        follow = _a.sent();
                        return [2 /*return*/, follow_respone_dto_1.FollowResponseDto.fromEntity(follow)];
                }
            });
        });
    };
    // 🟠 Bỏ theo dõi
    FriendController.prototype.unfollowUser = function (follower, userId) {
        return __awaiter(this, void 0, Promise, function () {
            var following, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        following = { id: userId };
                        return [4 /*yield*/, this.friendService.unfollowUser(follower, following)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, { success: result }];
                }
            });
        });
    };
    // 🟡 Danh sách bạn bè
    FriendController.prototype.getFriends = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var friends;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.getFriends(userId)];
                    case 1:
                        friends = _a.sent();
                        return [2 /*return*/, friends.map(function (f) { return user_summary_dto_1.UserSummaryDto.fromEntity(f); })];
                }
            });
        });
    };
    FriendController.prototype.suggestFriends = function (user, limit) {
        if (limit === void 0) { limit = 5; }
        return __awaiter(this, void 0, Promise, function () {
            var suggestions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.suggestFriends(user.id, +limit)];
                    case 1:
                        suggestions = _a.sent();
                        return [2 /*return*/, suggestions.map(function (s) { return user_summary_dto_1.UserSummaryDto.fromEntity(s); })];
                }
            });
        });
    };
    FriendController.prototype.getFollowers = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var followers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.getFollowers(userId)];
                    case 1:
                        followers = _a.sent();
                        return [2 /*return*/, followers.map(function (f) { return user_summary_dto_1.UserSummaryDto.fromEntity(f); })];
                }
            });
        });
    };
    FriendController.prototype.getFollowing = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var following;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.friendService.getFollowing(userId)];
                    case 1:
                        following = _a.sent();
                        return [2 /*return*/, following.map(function (f) { return user_summary_dto_1.UserSummaryDto.fromEntity(f); })];
                }
            });
        });
    };
    __decorate([
        common_1.Post('request'),
        swagger_1.ApiOperation({ summary: 'Gửi lời mời kết bạn' }),
        swagger_1.ApiResponse({ status: 201, type: friend_respone_dto_1.FriendResponseDto }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Body())
    ], FriendController.prototype, "sendFriendRequest");
    __decorate([
        common_1.Post('accept/:friendId'),
        swagger_1.ApiOperation({ summary: 'Chấp nhận lời mời kết bạn' }),
        swagger_1.ApiResponse({ status: 200, type: friend_respone_dto_1.FriendResponseDto }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Param('friendId'))
    ], FriendController.prototype, "acceptFriendRequest");
    __decorate([
        common_1.Delete('reject/:friendId'),
        swagger_1.ApiOperation({ summary: 'Từ chối lời mời kết bạn' }),
        swagger_1.ApiResponse({ status: 200, description: 'Lời mời đã bị từ chối' }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Param('friendId'))
    ], FriendController.prototype, "rejectFriendRequest");
    __decorate([
        common_1.Delete(':friendId'),
        swagger_1.ApiOperation({ summary: 'Hủy kết bạn' }),
        swagger_1.ApiResponse({ status: 200, description: 'Đã hủy kết bạn thành công' }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Param('friendId'))
    ], FriendController.prototype, "unfriend");
    __decorate([
        common_1.Post('follow/:userId'),
        swagger_1.ApiOperation({ summary: 'Theo dõi người dùng' }),
        swagger_1.ApiResponse({ status: 201, type: follow_respone_dto_1.FollowResponseDto }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Param('userId'))
    ], FriendController.prototype, "followUser");
    __decorate([
        common_1.Delete('unfollow/:userId'),
        swagger_1.ApiOperation({ summary: 'Bỏ theo dõi người dùng' }),
        swagger_1.ApiResponse({ status: 200, description: 'Đã bỏ theo dõi thành công' }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Param('userId'))
    ], FriendController.prototype, "unfollowUser");
    __decorate([
        common_1.Get('list/:userId'),
        swagger_1.ApiOperation({ summary: 'Lấy danh sách bạn bè của người dùng' }),
        swagger_1.ApiResponse({ status: 200, type: [user_summary_dto_1.UserSummaryDto] }),
        __param(0, common_1.Param('userId'))
    ], FriendController.prototype, "getFriends");
    __decorate([
        common_1.Get('suggest'),
        swagger_1.ApiOperation({ summary: 'Gợi ý bạn bè (dựa theo bạn chung hoặc sở thích)' }),
        swagger_1.ApiResponse({ status: 200, type: [user_summary_dto_1.UserSummaryDto] }),
        __param(0, current_user_decorator_1.CurrentUser()),
        __param(1, common_1.Query('limit'))
    ], FriendController.prototype, "suggestFriends");
    __decorate([
        common_1.Get('followers/:userId'),
        swagger_1.ApiOperation({ summary: 'Danh sách người theo dõi bạn' }),
        swagger_1.ApiResponse({ status: 200, type: [user_summary_dto_1.UserSummaryDto] }),
        __param(0, common_1.Param('userId'))
    ], FriendController.prototype, "getFollowers");
    __decorate([
        common_1.Get('following/:userId'),
        swagger_1.ApiOperation({ summary: 'Danh sách người bạn đang theo dõi' }),
        swagger_1.ApiResponse({ status: 200, type: [user_summary_dto_1.UserSummaryDto] }),
        __param(0, common_1.Param('userId'))
    ], FriendController.prototype, "getFollowing");
    FriendController = __decorate([
        swagger_1.ApiTags('Friend / Follow'),
        common_1.Controller('friends')
    ], FriendController);
    return FriendController;
}());
exports.FriendController = FriendController;
