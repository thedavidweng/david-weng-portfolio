import { mkdtempSync, mkdirSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { createEmptyArchiveCollection } from "@/content/archives/_shared";
import { localized } from "@/lib/i18n";
import { scanArchiveItemsFromDirectory } from "@/lib/archive-server";

test("auto-discovers new archive images from directory structure and merges metadata overrides", () => {
  const root = mkdtempSync(join(tmpdir(), "archive-scan-"));

  mkdirSync(join(root, "covers"), { recursive: true });
  mkdirSync(join(root, "square"), { recursive: true });
  mkdirSync(join(root, "event-photos"), { recursive: true });

  writeFileSync(join(root, "covers", "cover-main.png"), "cover");
  writeFileSync(join(root, "square", "new-social.png"), "square");
  writeFileSync(join(root, "event-photos", "event-01.jpg"), "event");

  const collection = createEmptyArchiveCollection("bc-ai-ecosystem", "Test Archive", "测试档案");
  collection.defaultCredits = {
    "event-photo": {
      label: localized("Michelle Diamond", "Michelle Diamond"),
      href: "https://www.instagram.com/diamondsedgephotography/"
    }
  };
  collection.items = [
    {
      file: "covers/cover-main.png",
      kind: "cover",
      featured: true,
      title: localized("Main cover", "主封面")
    }
  ];

  const items = scanArchiveItemsFromDirectory(root, collection);

  expect(items.some((item) => item.file === "square/new-social.png")).toBe(true);
  expect(items.some((item) => item.file === "event-photos/event-01.jpg")).toBe(true);
  expect(items.find((item) => item.file === "event-photos/event-01.jpg")?.credit?.label.en).toBe("Michelle Diamond");
  expect(items.find((item) => item.file === "square/new-social.png")).toMatchObject({
    width: 1500,
    height: 1500
  });
  expect(items.find((item) => item.file === "event-photos/event-01.jpg")).toMatchObject({
    width: 1920,
    height: 1080
  });
});
