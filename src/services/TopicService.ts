// Example Topic Service that retrieves the topic from the database
export default class TopicService {
    // Static method to asynchronously get the topic
    static async getTopic(): Promise<string> {
      // Retrieve the topic from the database
      const response = await fetch('/api/topic'); // Endpoint that retrieves the topic from the database
      const data = await response.json();
      return data.topic; // Assuming the response contains an object with the 'topic' field
    }
  }
  