import { Component } from '@angular/core';

@Component({
  selector: 'app-countdown-to-instagram-token-refresh',
  templateUrl: './countdown-to-instagram-token-refresh.component.html',
  styleUrls: ['./countdown-to-instagram-token-refresh.component.scss'],
})
export class CountdownToInstagramTokenRefreshComponent {
  protected dateOfLastRefresh = new Date('2024-01-08T00:00:00');
  private todaysDate = new Date();
  protected daysUntilTokenExpires: number =
    this.getDaysUntilTokenExpiresFromDateOfLastRefresh(5183888);

  protected showDocumentation: boolean = false;

  constructor() {}

  private getDaysUntilTokenExpiresFromDateOfLastRefresh(
    secondsUntilTokenExpires: number
  ): number {
    const secondsInADay = 86400;
    const daysUntilTokenExpires =
      (secondsUntilTokenExpires -
        (this.todaysDate.getTime() - this.dateOfLastRefresh.getTime()) / 1000) /
      secondsInADay;
    return Math.round(daysUntilTokenExpires);
  }

  protected toggleShowDocumentation(): void {
    this.showDocumentation = !this.showDocumentation;
  }
}

/**
 * Here is how you get the tokens. Do this once you add crimsoncanyonresort as a test user.
 *
 * Authenticate the test user. Run this url in the browser. Remove the #_ from the end of the response.
 * https://api.instagram.com/oauth/authorize
  ?client_id=718347346763244
  &redirect_uri=https://crimson-canyon-resort-prod.web.app/
  &scope=user_profile,user_media
  &response_type=code


  Response: AQANVfbB49ifvdzBPVWFqwIWsAi87JODJRmZBGWnWLQipt9yNGElyWrKOr36zfilIhzEZ5PqZkKFz8pPCrdFAjmNjL3yOK9mUocDPr0OW0EHKNs6QowGRd9jzR5LxcSHP7GNOVYBY_IinXrFNCsFb1EqCaFmvf71gfNpeLZYVd0hZFwD1RWQzs_gZz7SM4Fa6cZuLwbO7LU6Tz8Z7J-sEMNrs5HgcMPjN3oICsVsZ2w9Wg
  Response 1/8/24: AQDNcLs_vawp8jWGEfsdSdZOE6dN9Gmte03IbO7Z95srmpjKnwwXseuppgZX8P9kDfOk5YbedwY2oUwrVDW4j5uCJ9x-Oj_xhMZJWvdhp2rcsobF9GlstvT4pJd0rO3DksufQdokkvV3atMSv_bxEL80LUvUrNI_6o1J1sURSCk8bb9eQCjKuzdZ984NuZNbM3fRGE2sub4bJMfvdMlaVokA422ErMz3_uAIlhGUC5CMZQ


 *
 *
 * Exchange the code for a token (enter this command with the curl -X POST ... in the terminal)
 *
 * curl -X POST \
  https://api.instagram.com/oauth/access_token \
  -F client_id=718347346763244 \
  -F client_secret=462088733f293fb5ab4b05ebaaf9a1d8 \
  -F grant_type=authorization_code \
  -F redirect_uri=https://crimson-canyon-resort-prod.web.app/ \
  -F code=AQANVfbB49ifvdzBPVWFqwIWsAi87JODJRmZBGWnWLQipt9yNGElyWrKOr36zfilIhzEZ5PqZkKFz8pPCrdFAjmNjL3yOK9mUocDPr0OW0EHKNs6QowGRd9jzR5LxcSHP7GNOVYBY_IinXrFNCsFb1EqCaFmvf71gfNpeLZYVd0hZFwD1RWQzs_gZz7SM4Fa6cZuLwbO7LU6Tz8Z7J-sEMNrs5HgcMPjN3oICsVsZ2w9Wg
 *


  Response: IGQWRQSUh3MGxLN3FDVUgwNUFfY2VxdTd1bWphSExiLWk5NDZAKcjM5U1F0OER4bjc5VEFoNVJIRTEyeGJiNFVZAVXAzekk5ZADRDVG00azBkUThGaXZAMNG9abDBOOUh5NVREdnNyU1JXdWtYeUhFNmxLbWQtTkFPSGFKTGZAuMXJMVnM1QQZDZD
  Response 1/8/24: IGQWRQbG1tTEFLanBIb2JwM3FvYTVCQnFEUjkxUC1PSUdmaWhCcmVwSHM1d1ItSk9ldkpEQjZAHWUFEV0ZAsMDRCTm43dVVCN1A1MmZAINUs2REVsaGJkX3JPUmFLbVl2c3A0NktvSXNxdm00ejdPRjlEWFJQMmdkc1RVc2tqaGtkNW9JUQZDZD
 *

  Get the long lived access token (run this url in the browser)

 https://graph.instagram.com/access_token
  ?grant_type=ig_exchange_token
  &client_secret=462088733f293fb5ab4b05ebaaf9a1d8
  &access_token=IGQWRQSUh3MGxLN3FDVUgwNUFfY2VxdTd1bWphSExiLWk5NDZAKcjM5U1F0OER4bjc5VEFoNVJIRTEyeGJiNFVZAVXAzekk5ZADRDVG00azBkUThGaXZAMNG9abDBOOUh5NVREdnNyU1JXdWtYeUhFNmxLbWQtTkFPSGFKTGZAuMXJMVnM1QQZDZD


  Response:
  {
   "access_token": "IGQWRQdzFZAeTlSYUpCNURnV0UyVVlYMmlSbVlWT1prcHFfSUM1MDdUT24wX19jdmNSbHlWZAjRoaEtFQ29uZA1dsemthNEZAFY01OX215c2VDcWhobGIyMlQ2NWswNmhrTnE4MEpLVE8tOHJTQQZDZD",
   "token_type": "bearer",
   "expires_in": 5184000
}

Response 1/8/24:
{
   "access_token": "IGQWRPa3BrVG42aENrd0hfaTM4anVLb2lJX0d1LUswSFh4X2xDbGxUblYta1h1dFFWY2c5TmFZAblQ0anN0U0QwbDlVN0NFOW1VNXh4V0V5a1V5bG9Hdkd2MXl6TzUxTllLLS1yT0s4QkJKUQZDZD",
   "token_type": "bearer",
   "expires_in": 5184000
}

Refresh the long-lived token (before it expires). Run this url in the browser. I think this gives us an even longer lasting code.

https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=IGQWRQdzFZAeTlSYUpCNURnV0UyVVlYMmlSbVlWT1prcHFfSUM1MDdUT24wX19jdmNSbHlWZAjRoaEtFQ29uZA1dsemthNEZAFY01OX215c2VDcWhobGIyMlQ2NWswNmhrTnE4MEpLVE8tOHJTQQZDZD

Response:

{
   "access_token": "IGQWRQcjdMeW9hVW1rWGthNl9JOWZA2WlNnaUl6Q1dqRFQzUVpRRm0tV05ZAbU5IeXJZATFZAvMjVVeUpYU2VNUmI4ejdGaklBUFBXX0VWaFU1Nkd5dk1RazFFb1JjVEd0MTNwdTFVTDl3S3BnUQZDZD",
   "token_type": "bearer",
   "expires_in": 5184000
}

Response: 1/8/24
{
   "access_token": "IGQWROV1MxWkxBNUVPX2s5M2g2XzR4U2dTT2dfTWZAieFhSVDBwRzNuc2VQSWxIUEhBejFqaWdxcUoybHNwYlZAPNnpHbTVienlSTXAtR0VVYzNnV3p5MFQ1R3hYYUVCbmhPbHhrbjlBcUtOQQZDZD",
   "token_type": "bearer",
   "expires_in": 5183888
}

 */
