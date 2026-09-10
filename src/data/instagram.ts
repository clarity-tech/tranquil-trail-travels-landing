/**
 * Curated Instagram posts surfaced on the site.
 *
 * WHY A CURATED LIST RATHER THAN A LIVE FEED
 * Instagram walls off anonymous reads — the profile and the /embed/ endpoint
 * both return a JavaScript shell to anything that is not a logged-in browser —
 * so a static site cannot scrape the grid. The supported routes are Meta's
 * `instagram_oembed` endpoint at build time, or a third-party widget. Both add
 * an external failure mode to a page that is otherwise pure static HTML; a
 * curated list has none, renders in our own type and colour, and ships no
 * third-party JavaScript.
 *
 * TO ADD A POST
 *   1. Copy the post URL from Instagram (the ".../p/<code>/" or ".../reel/<code>/" form).
 *   2. Save the image into `public/instagram/` and point `image` at it. Do not
 *      hotlink Instagram's CDN — those URLs are signed and expire within days.
 *   3. Write a caption in our own voice. Instagram captions are hashtag-heavy;
 *      this text is what a reader sees on hover, so keep it to a short line.
 *
 * DO NOT REACH FOR oEmbed TO AUTOMATE STEP 2 — IT WAS TESTED AND IT DOES NOT WORK
 * Meta did drop the access-token requirement on `instagram_oembed` in June 2026,
 * and the endpoint answers unauthenticated. But on 2026-09-10, called against
 * real posts on this account, it returned only the grey `<blockquote>` loading
 * skeleton: no `thumbnail_url`, no `author_name`, no media of any kind. That
 * skeleton is inert until Instagram's own embed.js hydrates it in the browser,
 * which is exactly the third-party dependency this component exists to avoid.
 * Tokenless oEmbed can confirm a post exists. It cannot give you an image.
 */

export interface InstagramPost {
  /** Canonical post URL — where the tile links to */
  permalink: string;
  /** Only for the curated renderer: a local file under /instagram/.
   *  The embed renderer needs nothing but the permalink. */
  image?: string;
  /** Describes the photograph for screen readers and when the image fails */
  alt: string;
  /** Short line shown on hover — our words, not the Instagram caption */
  caption: string;
  /** Drives the corner glyph: reels and carousels read differently at a glance */
  type: "image" | "reel" | "carousel";
}

/**
 * The five most recent posts worth featuring, newest first.
 *
 * The 28 Aug 2026 carousel is deliberately skipped: it is a "Sorry We Ghosted!!"
 * card apologising for having stopped posting, which undercuts the section it
 * would sit in. Recency is not the only filter — judge each post before adding.
 *
 * Rendered by InstagramEmbeds.astro, which hands the permalinks to Instagram's
 * own embed script — so the media, the caption and the carousel arrows come
 * from Instagram at full resolution and stay current if a post is edited. The
 * `caption` below is used only for the pre-hydration link and for screen
 * readers; Instagram supplies its own once the embed loads.
 *
 * Emptying this array hides the whole section; that is the correct state
 * whenever there is nothing current worth showing.
 */
export const instagramPosts: InstagramPost[] = [
  {
    permalink: "https://www.instagram.com/reel/DdHBW1hhFqP/",
    alt: "A truck on the highway winding through green hills under a wide cloudy sky",
    caption: "The long road north, and nobody wanting to turn back",
    type: "reel",
  },
  {
    permalink: "https://www.instagram.com/p/DdB3Iz-gb9P/",
    alt: "Green hills falling away to a lake under a tall bank of monsoon cloud",
    caption: "Postcards from paradise — the hills above the lake",
    type: "carousel",
  },
  {
    permalink: "https://www.instagram.com/reel/Dc88UDhB8Cw/",
    alt: "A crowded Shillong street in the rain, umbrellas and taxis nose to tail",
    caption: "Police Bazar at rush hour, umbrellas and all",
    type: "reel",
  },
  {
    permalink: "https://www.instagram.com/reel/Dc3jTfIhbWW/",
    alt: "A woman tending a roadside vegetable stall under a blue tarpaulin in the hills",
    caption: "The matriarchs of the hills, and the markets they run",
    type: "reel",
  },
  {
    permalink: "https://www.instagram.com/p/DcyZtmtAYBN/",
    alt: "The Centre Point building on Shillong's busiest shopping street",
    caption: "Shillong's most iconic street, and what you didn't know",
    type: "carousel",
  },
];
