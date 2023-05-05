interface Copy {
  headline: string;
  cta: string;
  content: string;
}

export interface Decision {
  id: string;
  text: string;
  body: string;
  copy: Copy;
  image?: string;
  image_size?: [number, number];
  link: string;
  view_url: string;
  view_time_url: string;
  nonce: string;
  display_type: string;
  campaign_type: string;
  html: string[];
  div_id: string;
}
