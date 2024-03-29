import pkgJson from "../../package.json";
import { type Decision } from "../types/decision";

const AD_CLIENT_VERSION = pkgJson.version;

export type OptimalConfig = {
  optimalBaseUrl?: string;
};

export type GetAdOpts = {
  publisher: string;
  adTypes: string[];
  keywords?: string[];
  campaignTypes?: string[];
  priorities?: string[];
  viewerData: {
    wallets: string[];
  };
  forceAd?: boolean;
  forceCampaign?: boolean;
  url?: string;
};

export class OptimalClient {
  private baseUrl: string;
  constructor(config?: OptimalConfig) {
    this.baseUrl = config?.optimalBaseUrl || "https://i.useoptimal.xyz";
  }

  public async getAd(opts: GetAdOpts): Promise<Decision> {
    const params: Record<string, string> = {
      publisher: opts.publisher,
      ad_types: opts.adTypes.join("|"),
      client_version: AD_CLIENT_VERSION,
      wallets: opts.viewerData.wallets.join("|"),
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

    if (opts.priorities !== undefined) {
      params.priorities = opts.priorities.join("|");
    }

    if (opts.campaignTypes !== undefined) {
      params.campaign_types = opts.campaignTypes.join("|");
    }

    if (opts.url !== undefined) {
      params.url = opts.url;
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

  public async trackView(decision: Decision) {
    const url = decision.view_url;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load ad view: ${url}`);
    }
  }

  public async trackViewTime(
    decision: Decision,
    visibleDurationInMillis: number | null,
  ) {
    const url = decision?.view_time_url;

    if (url && visibleDurationInMillis) {
      const params = new URLSearchParams({
        view_time: Math.ceil(visibleDurationInMillis / 1000).toString(),
      });
      const trackUrl = `${url}?${params}`;
      const response = await fetch(trackUrl);

      if (!response.ok) {
        throw new Error(`Failed to load ad view: ${trackUrl}`);
      }
    }
  }
}
