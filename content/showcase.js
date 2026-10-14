export const showcaseGroups = [
    {
        title: "",
        items: [
            {
                id: "welcome",
                width: 8,
                className: "card border-0 shadow-sm bg-white",
                html: `
                    <div class="p-4">
                        <h2>Welcome to Showcase!</h2>
                        <hr>
                        <p><code>Showcase</code> is a page where you can show off almost anything you want. It can be photos, favorite books, projects, or anything else you want to share.</p>
                        <p>Showcase content is kept in <code>content/showcase.js</code>. Add an object to a group to create a card without changing the page layout.</p>
                        <p>The <code>width</code> field controls card width on desktop, from 1 to 12 columns. For a tidy layout, widths of 3 or 4 work especially well, while small badges can use 1.</p>
                    </div>`,
            },
            {
                id: "photo-collection",
                width: 4,
                className: "card border-0 shadow-sm bg-white",
                carousel: {
                    height: 295,
                    images: [
                        { src: "https://picsum.photos/seed/first1111/800/800", title: "Photo 1", description: "Description 1.", link: "https://picsum.photos/" },
                        { src: "https://picsum.photos/seed/second22/800/800", title: "Photo 2", description: "Description 2" },
                        { src: "https://picsum.photos/seed/third33/800/800" },
                    ],
                },
            },
            {
                id: "organization",
                width: 4,
                className: "card border-0 shadow-sm bg-white",
                html: `
                    <div class="p-4">
                        <h5>Simple and Organized</h5>
                        <hr>
                        <p>This page uses structured JavaScript data, shared components, and no build tools. Edit or remove showcase cards in <code>content/showcase.js</code>.</p>
                    </div>`,
            },
            {
                id: "lazy-image",
                width: 4,
                className: "card border-0 shadow-sm bg-white",
                html: `
                    <div class="position-relative">
                        <img src="assets/images/covers/cover1.jpg" loading="lazy" class="w-100 rounded-sm" alt="Example cover">
                        <div class="card-img-overlay image-overlay-scroll">
                            <h5 class="card-title">Native Lazy Loading</h5>
                            <p class="card-text">Images use the browser's built-in <code>loading="lazy"</code> support, so no extra lazy-loading library is required.</p>
                        </div>
                    </div>`,
            },
            {
                id: "formula",
                width: 4,
                className: "card border-0 shadow-sm bg-white",
                html: `<div class="p-4 text-center formula"><var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup></div>`,
            },
            {
                id: "pku-badge",
                width: 1,
                className: "",
                html: `<img src="assets/images/badges/PKU_red.png" loading="lazy" class="img-fluid rounded" alt="PKU badge">`,
            },
            {
                id: "mit-badge",
                width: 1,
                className: "",
                html: `<img src="assets/images/badges/MIT_Social_circle.png" loading="lazy" class="img-fluid rounded" alt="MIT badge">`,
            },
            {
                id: "tim-badge",
                width: 1,
                className: "",
                html: `<img src="assets/images/etc/tim_the_beaver.png" loading="lazy" class="img-fluid rounded" alt="Tim the Beaver">`,
            },
        ],
    },
    {
        title: "Cats",
        items: [
            {
                id: "cat-one",
                width: 3,
                className: "card border-0 shadow-sm bg-white",
                html: `<img src="assets/images/etc/cat1.jpg" loading="lazy" class="img-fluid rounded" alt="Cat">`,
            },
            {
                id: "cat-two",
                width: 3,
                className: "card border-0 shadow-sm bg-white",
                html: `<img src="assets/images/etc/cat2.jpg" loading="lazy" class="w-100 rounded" alt="Cat" title="Caption of this image">`,
            },
            {
                id: "cat-three",
                width: 3,
                className: "card border-0 shadow-sm bg-white",
                html: `<a href="https://unsplash.com/photos/russian-blue-cat-standing-near-ceramic-vase-with-artificial-flowers-Vv45XEMJWZk" target="_blank" rel="noopener"><img src="https://images.unsplash.com/photo-1497473376897-16fbb7552478?q=80&w=1200&auto=format&fit=crop" loading="lazy" class="w-100 rounded" alt="Russian blue cat"></a>`,
            },
            {
                id: "cat-four",
                width: 3,
                className: "card border-0 shadow-sm bg-white",
                html: `
                    <img src="https://images.unsplash.com/photo-1536070800722-f1a29a336bc7?q=80&w=1200&auto=format&fit=crop" loading="lazy" class="w-100 rounded-top" alt="Cat close-up">
                    <div class="card-body"><p class="card-text">Meow! I am a cat. <a href="https://unsplash.com/photos/russian-blue-cat-in-close-up-photography-1pjqSWDcgwo" target="_blank" rel="noopener">Unsplash</a></p></div>`,
            },
            {
                id: "portrait-card",
                width: 3,
                className: "card border-0 shadow-sm bg-white",
                html: `<img src="assets/images/photos/KirtanPatel-cropped.jpg" loading="lazy" class="w-100 rounded" alt="Kirtan Patel">`,
            },
        ],
    },
];
