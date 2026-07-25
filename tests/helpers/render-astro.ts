import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getContainerRenderer } from "@astrojs/react/container-renderer";
import { loadRenderers } from "astro:container";
import { JSDOM } from "jsdom";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

let containerPromise: Promise<AstroContainer> | null = null;

function getContainer() {
  containerPromise ??= loadRenderers([getContainerRenderer()]).then((renderers) =>
    AstroContainer.create({ renderers })
  );
  return containerPromise;
}

export async function renderAstroPage(
  component: AstroComponentFactory,
  props: Record<string, unknown>
): Promise<Document> {
  const container = await getContainer();
  const html = await container.renderToString(component, { props });
  return new JSDOM(html).window.document;
}
