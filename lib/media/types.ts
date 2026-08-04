export type MediaProvider = 'unsplash' | 'pexels' | 'pixabay';

/** A single normalized search result, regardless of which provider it came from. */
export interface MediaSearchResult {
  /** The provider's own id for this photo — used for de-duplication and attribution. */
  sourceId: string;
  provider: MediaProvider;
  /** Small preview image, for the search results grid. */
  thumbUrl: string;
  /** Full-size image URL, used as the actual featured/inserted image. */
  fullUrl: string;
  width: number;
  height: number;
  /** Suggested alt text from the provider's description field, if any — always editable before inserting. */
  suggestedAlt: string;
  /** Required by most providers' API terms — shown alongside the image. */
  attribution: string;
  /** Link to the photo's page on the provider's site (part of most attribution requirements). */
  sourceUrl: string;
}
