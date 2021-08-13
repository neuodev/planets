const text1 = (fileName) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link
      href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
      rel="stylesheet"
    />

    <title>${fileName}</title>
  </head>
  <body class="bg-gray-100">
    <div
      class="
        container
        max-w-lg
        mx-auto
        h-screen
        flex
        items-center
        justify-center
        flex-col
      "
    >`;

const text2 = (image, name) => {
  return `      <div
    class="
      relative
      overflow-hidden
      border
      mb-4
      rounded-md
      shadow-md
      cursor-move
      transform
      transition-shadow
      hover:shadow-lg
      flex
      items-center
      w-full
      h-28
    "
  >
    <div class="w-1/2">
      <img
        class="w-full object-fit"
        src="${image}"
        alt="${name}"
      />
    </div>
    <div class="w-1/2">
      <p class="text-center text-gray-700">${name}</p>
    </div>
  </div>`;
};

const text3 = `</div></body></html>`;

module.exports = {
  text1,
  text2,
  text3,
};
