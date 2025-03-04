import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

const config: QuartzConfig = {
 configuration: {
   pageTitle: "💻 Red Devil Hacks 2025",
   pageTitleSuffix: "",
   enableSPA: true,
   enablePopovers: true,
   analytics: {
     provider: "plausible",
   },
   locale: "en-US",
   baseUrl: "RedDevilHacks.github.io",
   ignorePatterns: ["private", "templates", ".obsidian"],
   defaultDateType: "created",
   generateSocialImages: false,
   theme: {
     fontOrigin: "googleFonts",
     cdnCaching: true,
     typography: {
       header: "Schibsted Grotesk",
       body: "Source Sans Pro",
       code: "IBM Plex Mono",
     },
     colors: {
       lightMode: {
         light: "#faf8f8",
         lightgray: "#e5e5e5",
         gray: "#919195",
         darkgray: "#4e4e4e",
         dark: "#2b2b2b",
         secondary: "#c8102e",
         tertiary: "#919195",
         highlight: "rgba(200, 16, 46, 0.15)",
         textHighlight: "#c8102e88",
       },
       darkMode: {
         light: "#161618",
         lightgray: "#393639",
         gray: "#919195",
         darkgray: "#d4d4d4",
         dark: "#ebebec",
         secondary: "#c8102e",
         tertiary: "#919195",
         highlight: "rgba(200, 16, 46, 0.15)",
         textHighlight: "#c8102e88",
       },
     },
   },
 },
 plugins: {
   transformers: [
     Plugin.FrontMatter(),
     Plugin.CreatedModifiedDate({
       priority: ["frontmatter", "filesystem"],
     }),
     Plugin.SyntaxHighlighting({
       theme: {
         light: "github-light",
         dark: "github-dark",
       },
       keepBackground: false,
     }),
     Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
     Plugin.GitHubFlavoredMarkdown(),
     Plugin.TableOfContents(),
     Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
     Plugin.Description(),
     Plugin.Latex({ renderEngine: "katex" }),
   ],
   filters: [Plugin.RemoveDrafts()],
   emitters: [
     Plugin.AliasRedirects(),
     Plugin.ComponentResources(),
     Plugin.ContentPage(),
     Plugin.FolderPage(),
     Plugin.TagPage(),
     Plugin.ContentIndex({
       enableSiteMap: true,
       enableRSS: true,
     }),
     Plugin.Assets(),
     Plugin.Static(),
     Plugin.NotFoundPage(),
   ],
 },
}
export default config
