"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.FriendRepository = void 0;
var common_1 = require("@nestjs/common");
var base_repository_repository_1 = require("src/common/repositories/base-repository.repository");
var user_entity_1 = require("src/modules/user/entities/user.entity");
var friend_entity_1 = require("../entities/friend.entity");
var follows_entity_1 = require("../entities/follows.entity");
var typeorm_1 = require("@nestjs/typeorm");
var status_make_friend_enum_1 = require("src/common/enums/status-make-friend.enum");
var FriendRepository = /** @class */ (function (_super) {
    __extends(FriendRepository, _super);
    function FriendRepository(repository, followRepository, userRepository) {
        var _this = _super.call(this, repository) || this;
        _this.repository = repository;
        _this.followRepository = followRepository;
        _this.userRepository = userRepository;
        return _this;
    }
    FriendRepository.prototype.sendFriendRequest = function (sender, receiver) {
        return __awaiter(this, void 0, Promise, function () {
            var existing, request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (sender.id === receiver.id) {
                            throw new common_1.BadRequestException('Không thể gửi lời mời kết bạn cho chính mình');
                        }
                        return [4 /*yield*/, this.repository.findOne({
                                where: [
                                    { sender: sender, receiver: receiver },
                                    { sender: receiver, receiver: sender },
                                ]
                            })];
                    case 1:
                        existing = _a.sent();
                        if (existing) {
                            throw new common_1.BadRequestException('Đã tồn tại quan hệ kết bạn hoặc lời mời');
                        }
                        request = this.repository.create({
                            sender: sender,
                            receiver: receiver,
                            status: status_make_friend_enum_1.MakeFiendStatus.PENDING
                        });
                        return [4 /*yield*/, this.save(request)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FriendRepository.prototype.acceptFriendRequest = function (friendId, user) {
        return __awaiter(this, void 0, Promise, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({
                            where: { friend_id: friendId },
                            relations: ['sender', 'receiver']
                        })];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            throw new common_1.NotFoundException('Lời mời kết bạn không tồn tại');
                        if (request.receiver.id !== user.id)
                            throw new common_1.BadRequestException('Bạn không có quyền chấp nhận lời mời này');
                        request.status = status_make_friend_enum_1.MakeFiendStatus.ACCEPTED;
                        return [4 /*yield*/, this.save(request)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FriendRepository.prototype.rejectFriendRequest = function (friendId, user) {
        return __awaiter(this, void 0, Promise, function () {
            var request;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({
                            where: { friend_id: friendId },
                            relations: ['receiver']
                        })];
                    case 1:
                        request = _a.sent();
                        if (!request)
                            throw new common_1.NotFoundException('Lời mời kết bạn không tồn tại');
                        if (request.receiver.id !== user.id)
                            throw new common_1.BadRequestException('Không thể từ chối lời mời không gửi cho bạn');
                        return [4 /*yield*/, this.repository["delete"](friendId)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FriendRepository.prototype.unfriend = function (user, friendId) {
        return __awaiter(this, void 0, Promise, function () {
            var relation;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository.findOne({
                            where: [
                                {
                                    sender: user,
                                    receiver: { id: friendId },
                                    status: status_make_friend_enum_1.MakeFiendStatus.ACCEPTED
                                },
                                {
                                    sender: { id: friendId },
                                    receiver: user,
                                    status: status_make_friend_enum_1.MakeFiendStatus.ACCEPTED
                                },
                            ]
                        })];
                    case 1:
                        relation = _a.sent();
                        if (!relation)
                            throw new common_1.NotFoundException('Không tồn tại quan hệ bạn bè');
                        return [4 /*yield*/, this.repository.remove(relation)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FriendRepository.prototype.followUser = function (follower, following) {
        return __awaiter(this, void 0, Promise, function () {
            var exist, follow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (follower.id === following.id)
                            throw new common_1.BadRequestException('Không thể theo dõi chính mình');
                        return [4 /*yield*/, this.followRepository.findOne({
                                where: { follower: follower, following: following }
                            })];
                    case 1:
                        exist = _a.sent();
                        if (exist)
                            throw new common_1.BadRequestException('Đã theo dõi người này');
                        follow = this.followRepository.create({
                            follower: follower,
                            following: following
                        });
                        return [4 /*yield*/, this.followRepository.save(follow)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    FriendRepository.prototype.unfollowUser = function (follower, following) {
        return __awaiter(this, void 0, Promise, function () {
            var follow;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.followRepository.findOne({
                            where: { follower: follower, following: following }
                        })];
                    case 1:
                        follow = _a.sent();
                        if (!follow)
                            throw new common_1.NotFoundException('Bạn chưa theo dõi người này');
                        return [4 /*yield*/, this.followRepository.remove(follow)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    FriendRepository.prototype.getFriends = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var friends;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.repository
                            .createQueryBuilder('friend')
                            .leftJoinAndSelect('friend.sender', 'sender')
                            .leftJoinAndSelect('friend.receiver', 'receiver')
                            .where('(sender.id = :userId OR receiver.id = :userId)', { userId: userId })
                            .andWhere('friend.status = :status', { status: 'accepted' })
                            .getMany()];
                    case 1:
                        friends = _a.sent();
                        return [2 /*return*/, friends.map(function (f) { return (f.sender.id === userId ? f.receiver : f.sender); })];
                }
            });
        });
    };
    FriendRepository.prototype.suggestFriends = function (userId, limit) {
        if (limit === void 0) { limit = 5; }
        return __awaiter(this, void 0, Promise, function () {
            var mutuals;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository
                            .createQueryBuilder('user')
                            .leftJoin('user.sentFriendRequests', 'sent')
                            .leftJoin('user.receivedFriendRequests', 'received')
                            .where('user.id != :userId', { userId: userId })
                            .andWhere("user.id NOT IN (\n          SELECT CASE\n            WHEN f.sender_id = :userId THEN f.receiver_id\n            WHEN f.receiver_id = :userId THEN f.sender_id\n          END\n          FROM friend f\n          WHERE f.status = 'accepted'\n        )", { userId: userId })
                            .limit(limit)
                            .getMany()];
                    case 1:
                        mutuals = _a.sent();
                        return [2 /*return*/, mutuals];
                }
            });
        });
    };
    FriendRepository.prototype.getFollowers = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var followers;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.followRepository.find({
                            where: { following: { id: userId } },
                            relations: ['follower']
                        })];
                    case 1:
                        followers = _a.sent();
                        return [2 /*return*/, followers.map(function (f) { return f.follower; })];
                }
            });
        });
    };
    FriendRepository.prototype.getFollowing = function (userId) {
        return __awaiter(this, void 0, Promise, function () {
            var following;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.followRepository.find({
                            where: { follower: { id: userId } },
                            relations: ['following']
                        })];
                    case 1:
                        following = _a.sent();
                        return [2 /*return*/, following.map(function (f) { return f.following; })];
                }
            });
        });
    };
    FriendRepository = __decorate([
        common_1.Injectable(),
        __param(0, typeorm_1.InjectRepository(friend_entity_1.Friend)),
        __param(1, typeorm_1.InjectRepository(follows_entity_1.Follow)),
        __param(2, typeorm_1.InjectRepository(user_entity_1.User))
    ], FriendRepository);
    return FriendRepository;
}(base_repository_repository_1.BaseRepository));
exports.FriendRepository = FriendRepository;
