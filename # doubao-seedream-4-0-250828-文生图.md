# doubao-seedream-4-0-250828-文生图

## OpenAPI Specification

```yaml
openapi: 3.0.1
info:
  title: ''
  description: ''
  version: 1.0.0
paths:
  /v1/images/generations:
    post:
      summary: doubao-seedream-4-0-250828-文生图
      deprecated: false
      description: |+
        给定提示和/或输入图像，模型将生成新图像。

        相关指南：[图像生成](https://www.volcengine.com/docs/82379/1666946)

        根据提示创建图像。

      tags:
        - 绘画模型/豆包系列
      parameters:
        - name: Authorization
          in: header
          description: ''
          required: false
          example: Bearer {{YOUR_API_KEY}}
          schema:
            type: string
      requestBody:
        content:
          application/json:
            schema:
              type: object
              properties:
                model:
                  type: string
                  description: 您需要调用的模型的 ID。
                prompt:
                  type: string
                  description: 文本描述，用于编辑图像的提示词。
                image:
                  type: string
                  description: >-
                    需要编辑的图像，输入图片的 Base64 编码或可访问的 URL。

                    图片URL：请确保图片URL可被访问。

                    Base64编码：请遵循此格式data:image/<图片格式>;base64,<Base64编码>。注意 <图片格式>
                    需小写，如 data:image/png;base64,<base64_image>。

                    说明

                    传入图片需要满足以下条件：

                    图片格式：jpeg、png。

                    宽高比（宽/高）：在范围 (1/3, 3) 。

                    宽高长度（px） > 14。

                    大小：不超过 10MB。
                response_format:
                  type: string
                  description: |-
                    指定生成图像的返回格式。支持以下两种取值：
                    url：以可下载的 jpeg 图片链接形式返回。
                    b64_json：以 Base64 编码字符串的 JSON 格式返回图像数据。
                    默认值 url
                size:
                  type: string
                  description: >-
                    生成图像的宽高像素。当前仅支持 adaptive。

                    adaptive。将您的输入图片尺寸与下表中的尺寸进行对比，选择最接近的，作为输出图片的尺寸。具体而言，会按顺序从可选比例中，选取与原图宽高比差值最小的第一个，作为生成图片的比例。
                seed:
                  type: integer
                  description: >-
                    随机数种子，用于控制模型生成内容的随机性。取值范围为 [-1, 2^31-1]，即 [-1, 2147483647]
                    之间的整数。如果不提供，则算法自动生成一个随机数作为种子。如果希望生成内容保持一致，可以使用相同的 seed 参数值。

                    默认值 -1
                guidance_scale:
                  type: number
                  description: >-
                    文本描述和输入图片对生成图像的影响程度。取值范围：[1, 10]
                    之间的浮点数。该值越大代表文本描述影响程度越大，且输入图片影响程度越小。

                    默认值 5.5
                watermark:
                  type: boolean
                  description: |-
                    是否在生成的图片中添加水印。
                    false：不添加水印。
                    true：在图片右下角添加“AI生成”字样的水印标识。
                    默认值 true
              required:
                - model
                - prompt
                - image
              x-apifox-orders:
                - model
                - prompt
                - image
                - response_format
                - size
                - seed
                - guidance_scale
                - watermark
            example:
              model: doubao-seedream-4-0-250828
              prompt: >-
                星际穿越，黑洞，黑洞里冲出一辆快支离破碎的复古列车，抢视觉冲击力，电影大片，末日既视感，动感，对比色，oc渲染，光线追踪，动态模糊，景深，超现实主义，深蓝，画面通过细腻的丰富的色彩层次塑造主体与场景，质感真实，暗黑风背景的光影效果营造出氛围，整体兼具艺术幻想感，夸张的广角透视效果，耀光，反射，极致的光影，强引力，吞噬
              size: 2K
              sequential_image_generation: disabled
              stream: false
              response_format: url
              watermark: true
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                type: object
                properties:
                  created:
                    type: integer
                  data:
                    type: array
                    items:
                      type: object
                      properties:
                        url:
                          type: string
                      required:
                        - url
                      x-apifox-orders:
                        - url
                required:
                  - created
                  - data
                x-apifox-orders:
                  - created
                  - data
              example:
                created: 1753847978
                data:
                  - url: >-
                      https://ime.lqjmauqqw.org/O8e0UlcHYzQyIiSwniXP6UgQt4v42c5G-ept86400.jpeg
                model: doubao-seededit-3-0-i2i-250628
                usage:
                  generated_images: 1
                  output_tokens: 3772
                  total_tokens: 3772
          headers: {}
          x-apifox-name: Create image
      security:
        - bearer: []
      x-apifox-folder: 绘画模型/豆包系列
      x-apifox-status: released
      x-run-in-apifox: https://app.apifox.com/web/project/5443236/apis/api-347960869-run
components:
  schemas: {}
  securitySchemes:
    bearer:
      type: http
      scheme: bearer
servers:
  - url: https://apipro.maynor1024.live
    description: 正式环境
security:
  - bearer: []

```