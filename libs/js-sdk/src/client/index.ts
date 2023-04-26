import pkgJson from "../../package.json";
import { type Decision } from "../types/decision";

const AD_CLIENT_VERSION = pkgJson.version;

export type OptimalConfig = {
  optimalBaseUrl?: string;
};

export type GetAdOpts = {
  publisher: string;
  adType: string;
  keywords?: string[];
  campaignTypes?: string[];
  viewerData: {
    wallets: string[];
  };
  forceAd?: boolean;
  forceCampaign?: boolean;
};

export class OptimalClient {
  private baseUrl: string;
  constructor(config?: OptimalConfig) {
    this.baseUrl = config?.optimalBaseUrl || "https://i.useoptimal.xyz";
  }

  public async getAd(opts: GetAdOpts): Promise<Decision> {
    const params: Record<string, string> = {
      publisher: opts.publisher,
      ad_types: opts.adType,
      campaign_types: (
        opts.campaignTypes ?? ["paid", "publisher-house", "community", "house"]
      ).join("|"),
      client_version: AD_CLIENT_VERSION,
      wallets: opts.viewerData.wallets.join("|"),
      div_ids: "notused",
    };

    if (opts.keywords) {
      params.keywords = opts.keywords.join("|");
    }

    if (opts.forceAd !== undefined) {
      params.force_ad = opts.forceAd.toString();
    }

    if (opts.forceCampaign !== undefined) {
      params.force_campaign = opts.forceCampaign.toString();
    }

    const response = await fetch(
      `${this.baseUrl}/api/v1/decision/?${new URLSearchParams(
        params,
      ).toString()}`,
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ad: ${response.status}`);
    }

    return response.json() as Promise<Decision>;
  }
}
