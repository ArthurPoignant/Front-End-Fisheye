/* eslint-disable */
class Model {
  static data = null;
  async getData() {
    if (this.data == null) {
      const reponse = await fetch('data/photographers.json');
      this.data = await reponse.json();
    }

    return this.data;
  }

  async getListPhotographers() {
    const data = await this.getData();
    return data.photographers;
  }
  async getPhotographerById(id) {
    let listPhotographers = await this.getListPhotographers();
    for (const photographer of listPhotographers) {
      if (photographer.id == id) {
        return photographer;
      }
    }
    return null;
  }
  async getListMedias() {
    const data = await this.getData();
    return data.media;
  }
  async getListMediaById(id) {
    const listMedias = await this.getListMedias();
    for (const media of listMedias) {
      if (media.id == id) {
        return media;
      }
    }
    return null;
  }
}

export default Model;
