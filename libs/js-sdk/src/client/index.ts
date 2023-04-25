export type Settings = {
  text: string;
};

export const client = {
  getAd: (settings: Settings) => {
    return Promise.resolve(settings.text);
  },
};
