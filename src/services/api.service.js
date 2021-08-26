class ApiService {
  constructor(baseUrl) {
    this.url = baseUrl;
  }

  async createPost(post) {
    try {
      const request = new Request(this.url + '/posts.json', {
        method: 'post',
        body: JSON.stringify(post)
      });
      return useRequest(request);
    } catch (error) {
      console.error(error);
    }
  }
  async fetchPosts(id = '') {
    try {
      // const request = new Request(`${this.url}/posts${id
      //   ? `/${id}`
      //   : ''}.json`, {
      //   method: 'get'
      // });
      const request = id
        ? new Request(`${this.url}/posts/${id}.json`, {
          method: 'get'
        })
        : new Request(`${this.url}/posts.json`, {
          method: 'get'
        });
      return useRequest(request);
    } catch (error) {
      console.error(error);
    }
  }
}

async function useRequest(request) {
  const response = await fetch(request);
  return await response.json();
}

export const apiService = new ApiService('https://js-native-blog-ec259-default-rtdb.europe-west1.firebasedatabase.app');