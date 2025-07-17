import axios from 'axios';

// Hàm này được sử dụng để khám phá schema GraphQL
async function exploreGraphQLSchema() {
    try {
        const endpoint = 'https://aqua-pigeon-769011.hostingersite.com/graphql';

        // Lấy JWT token từ biến môi trường
        const token = process.env.WORDPRESS_AUTH_REFRESH_TOKEN;

        // Introspection query để khám phá schema
        const query = `
      query IntrospectionQuery {
        __schema {
          types {
            name
            kind
            description
            inputFields {
              name
              description
              type {
                name
                kind
                ofType {
                  name
                  kind
                }
              }
            }
          }
          queryType {
            name
          }
          mutationType {
            name
          }
        }
      }
    `;

        // Gửi request
        const response = await axios.post(
            endpoint,
            { query },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        // Tìm CreateSubmissionInput trong schema
        const types = response.data?.data?.__schema?.types || [];
        const createSubmissionInput = types.find(type => type.name === 'CreateSubmissionInput');

        console.log('CreateSubmissionInput:', JSON.stringify(createSubmissionInput, null, 2));

        // Tìm tất cả mutations có chứa 'submission' trong tên
        const submissionMutations = types.filter(type =>
            type.name && type.name.toLowerCase().includes('submission')
        );

        console.log('Submission related types:', submissionMutations.map(m => m.name));

        return {
            createSubmissionInput,
            submissionMutations: submissionMutations.map(m => m.name)
        };
    } catch (error) {
        console.error('Lỗi khi khám phá schema GraphQL:', error);
        throw error;
    }
}

// Export để sử dụng từ command line hoặc từ file khác
export { exploreGraphQLSchema };

// Chạy nếu được gọi trực tiếp
if (require.main === module) {
    exploreGraphQLSchema()
        .then(result => {
            console.log('Kết quả khám phá schema:', result);
        })
        .catch(err => {
            console.error('Lỗi:', err);
        });
}
