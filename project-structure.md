# File Tree: src

Generated on: 10/16/2025, 8:19:36 PM
Root path: `d:\DAT\medium-clone\medium-clone-website\src`

```
├── common/
│   ├── decorators/
│   │   ├── current-user.decorator.ts
│   │   ├── get-user.decorator.ts
│   │   ├── roles.decorator.ts
│   │   └── serialize.decorator.ts
│   ├── dtos/
│   │   └── paginated-response.dto.ts
│   ├── enums/
│   │   ├── dist/ 🚫 (auto-hidden)
│   │   ├── membership.enum.ts
│   │   ├── post-status.enum.ts
│   │   ├── privacy.enum.ts
│   │   ├── status-make-friend.enum.ts
│   │   └── user-role.enum.ts
│   ├── guards/
│   │   ├── jwt-auth.guard.ts
│   │   └── roles.guard.ts
│   ├── helper/
│   │   ├── change-slug.helper.ts
│   │   └── create-paginated-respone.helper.ts
│   ├── interceptors/
│   │   └── serialize.interceptor.ts
│   ├── interfaces/
│   │   ├── auth-request.interface.ts
│   │   ├── base-repository.interface.ts
│   │   ├── currennt-user.interface.ts
│   │   ├── jwt-payload.interface.ts
│   │   ├── paginated-result.interface.ts
│   │   └── user.interface.ts
│   └── repositories/
│       └── base-repository.repository.ts
├── database/
│   └── datasource.ts
├── factories/
├── migrations/
├── modules/
│   ├── auth/
│   │   ├── dto/
│   │   │   └── login.dto.ts
│   │   ├── entities/
│   │   │   └── auth.entity.ts
│   │   ├── repositories/
│   │   ├── auth.controller.ts
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   └── jwt.strategy.ts
│   ├── comments/
│   │   ├── dist/ 🚫 (auto-hidden)
│   │   ├── dtos/
│   │   │   ├── create-comment.dto.ts
│   │   │   ├── get-comment.dto.ts
│   │   │   └── update-commet.dto.ts
│   │   ├── entities/
│   │   │   └── comment.entity.ts
│   │   ├── repositories/
│   │   │   ├── comments.repository.ts
│   │   │   └── workspace.code-workspace
│   │   ├── comments.controller.spec.ts
│   │   ├── comments.controller.ts
│   │   ├── comments.module.ts
│   │   ├── comments.service.spec.ts
│   │   └── comments.service.ts
│   ├── community/
│   │   ├── dto/
│   │   │   ├── create-community.dto.ts
│   │   │   └── update-community.dto.ts
│   │   ├── entities/
│   │   │   └── community.entity.ts
│   │   ├── community.controller.spec.ts
│   │   ├── community.controller.ts
│   │   ├── community.module.ts
│   │   ├── community.service.spec.ts
│   │   └── community.service.ts
│   ├── friends/
│   │   ├── dto/
│   │   │   ├── create-friend.dto.ts
│   │   │   └── update-friend.dto.ts
│   │   ├── entities/
│   │   │   ├── dist/ 🚫 (auto-hidden)
│   │   │   ├── follows.entity.ts
│   │   │   └── friend.entity.ts
│   │   ├── repositories/
│   │   │   ├── dist/ 🚫 (auto-hidden)
│   │   │   └── friends.repository.ts
│   │   ├── friends.controller.spec.ts
│   │   ├── friends.controller.ts
│   │   ├── friends.module.ts
│   │   ├── friends.service.spec.ts
│   │   └── friends.service.ts
│   ├── message/
│   │   ├── dto/
│   │   │   ├── create-message.dto.ts
│   │   │   └── update-message.dto.ts
│   │   ├── entities/
│   │   │   └── message.entity.ts
│   │   ├── message.controller.spec.ts
│   │   ├── message.controller.ts
│   │   ├── message.module.ts
│   │   ├── message.service.spec.ts
│   │   └── message.service.ts
│   ├── notifications/
│   │   ├── dto/
│   │   │   ├── create-notification.dto.ts
│   │   │   └── update-notification.dto.ts
│   │   ├── entities/
│   │   │   └── notification.entity.ts
│   │   ├── notifications.controller.spec.ts
│   │   ├── notifications.controller.ts
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.spec.ts
│   │   └── notifications.service.ts
│   ├── posts/
│   │   ├── dto/
│   │   │   ├── create-post.dto.ts
│   │   │   ├── get-post.dto.ts
│   │   │   ├── get-topic.dto.ts
│   │   │   └── update-post.dto.ts
│   │   ├── entities/
│   │   │   ├── post.entity.ts
│   │   │   └── topic.entity.ts
│   │   ├── repositories/
│   │   │   ├── post.repository.ts
│   │   │   └── topic.repository.ts
│   │   ├── posts.controller.spec.ts
│   │   ├── posts.controller.ts
│   │   ├── posts.module.ts
│   │   ├── posts.service.spec.ts
│   │   └── posts.service.ts
│   ├── search/
│   │   ├── dto/
│   │   │   ├── create-search.dto.ts
│   │   │   └── update-search.dto.ts
│   │   ├── entities/
│   │   │   └── search.entity.ts
│   │   ├── search.controller.spec.ts
│   │   ├── search.controller.ts
│   │   ├── search.module.ts
│   │   ├── search.service.spec.ts
│   │   └── search.service.ts
│   ├── tags/
│   │   ├── dto/
│   │   │   ├── create-tag.dto.ts
│   │   │   └── update-tag.dto.ts
│   │   ├── entities/
│   │   │   └── tag.entity.ts
│   │   ├── tags.controller.spec.ts
│   │   ├── tags.controller.ts
│   │   ├── tags.module.ts
│   │   ├── tags.service.spec.ts
│   │   └── tags.service.ts
│   ├── upload/
│   │   ├── dto/
│   │   │   ├── create-upload.dto.ts
│   │   │   └── update-upload.dto.ts
│   │   ├── entities/
│   │   │   └── upload.entity.ts
│   │   ├── upload.controller.spec.ts
│   │   ├── upload.controller.ts
│   │   ├── upload.module.ts
│   │   ├── upload.service.spec.ts
│   │   └── upload.service.ts
│   └── user/
│       ├── dto/
│       │   ├── change-passrord.dto.ts
│       │   ├── get-profile.dto.ts
│       │   ├── get-user.dto.ts
│       │   ├── privacy-setting.dto.ts
│       │   ├── public-profile.dto.ts
│       │   ├── register.dto.ts
│       │   ├── upadate-profile.dto.ts
│       │   └── update-user.dto.ts
│       ├── entities/
│       │   ├── dist/ 🚫 (auto-hidden)
│       │   └── user.entity.ts
│       ├── repositories/
│       │   └── user.repository.ts
│       ├── user.controller.spec.ts
│       ├── user.controller.ts
│       ├── user.module.ts
│       ├── user.service.spec.ts
│       └── user.service.ts
├── seeds/
├── types/
│   └── experss.d.ts
├── app.module.ts
└── main.ts
```

---
*Generated by FileTree Pro Extension*