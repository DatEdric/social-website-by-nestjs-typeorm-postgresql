"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var membership_enum_1 = require("src/common/enums/membership.enum");
var privacy_enum_1 = require("src/common/enums/privacy.enum");
var user_role_enum_1 = require("src/common/enums/user-role.enum");
var comment_entity_1 = require("src/modules/comments/entities/comment.entity");
var follows_entity_1 = require("src/modules/friends/entities/follows.entity");
var friend_entity_1 = require("src/modules/friends/entities/friend.entity");
var post_entity_1 = require("src/modules/posts/entities/post.entity");
var typeorm_1 = require("typeorm");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid')
    ], User.prototype, "id");
    __decorate([
        typeorm_1.Column({ unique: true })
    ], User.prototype, "email");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "name");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "full_name");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "bio");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "avatar_url");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "followers_count");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "following_count");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": membership_enum_1.Membership, "default": membership_enum_1.Membership.reader })
    ], User.prototype, "membership_status");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "social_link");
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "address");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": user_role_enum_1.UserRole, "default": user_role_enum_1.UserRole.MEMBER })
    ], User.prototype, "role");
    __decorate([
        typeorm_1.CreateDateColumn({ name: 'created_at' })
    ], User.prototype, "createdAt");
    __decorate([
        typeorm_1.UpdateDateColumn({ name: 'updated_at' })
    ], User.prototype, "updated_at");
    __decorate([
        typeorm_1.DeleteDateColumn({ name: 'deleted_at' })
    ], User.prototype, "deleted_at");
    __decorate([
        typeorm_1.Column({ name: 'is_deleted', type: 'boolean', "default": false })
    ], User.prototype, "isDeleted");
    __decorate([
        typeorm_1.Column({ type: 'enum', "enum": privacy_enum_1.Privacy, "default": privacy_enum_1.Privacy.PUBLIC })
    ], User.prototype, "privacy");
    __decorate([
        typeorm_1.OneToMany(function () { return post_entity_1.Post; }, function (post) { return post.author; }, { cascade: true })
    ], User.prototype, "posts");
    __decorate([
        typeorm_1.OneToMany(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; })
    ], User.prototype, "comments");
    __decorate([
        typeorm_1.OneToMany(function () { return friend_entity_1.Friend; }, function (friend) { return friend.sender; })
    ], User.prototype, "sentFriendRequests");
    __decorate([
        typeorm_1.OneToMany(function () { return friend_entity_1.Friend; }, function (friend) { return friend.receiver; })
    ], User.prototype, "receivedFriendRequests");
    __decorate([
        typeorm_1.OneToMany(function () { return follows_entity_1.Follow; }, function (follow) { return follow.follower; })
    ], User.prototype, "following");
    __decorate([
        typeorm_1.OneToMany(function () { return follows_entity_1.Follow; }, function (follow) { return follow.following; })
    ], User.prototype, "followers");
    User = __decorate([
        typeorm_1.Entity({ name: 'users' })
    ], User);
    return User;
}());
exports.User = User;
