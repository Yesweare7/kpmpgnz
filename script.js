/* KPMPNGN — Full Logic with Big Cards & Filters */

document.addEventListener("DOMContentLoaded", () => {
  
  // --- 1. NAVIGATION & MODAL LOGIC ---
  const pages = document.querySelectorAll(".page");
  const navBtns = document.querySelectorAll(".nav-btn");
  const homeCards = document.querySelectorAll(".home-card");

  function showPage(page) {
    pages.forEach(p => p.classList.remove("active"));
    const el = document.getElementById(page);
    if (el) el.classList.add("active");

    navBtns.forEach(btn => btn.classList.remove("active"));
    const btn = document.querySelector(`.nav-btn[data-page="${page}"]`);
    if (btn) btn.classList.add("active");
    
    const screen = document.querySelector('.screen');
    if(screen) screen.scrollTop = 0;
  }

  navBtns.forEach(btn => {
    btn.addEventListener("click", () => showPage(btn.dataset.page));
  });

  homeCards.forEach(card => {
    card.addEventListener("click", () => showPage(card.dataset.page));
  });

  const detailModal = document.getElementById("detailModal");
  const modalImg    = document.getElementById("modalImg");
  const modalTitle  = document.getElementById("modalTitle");
  const modalDesc   = document.getElementById("modalDesc");
  const modalMap    = document.getElementById("modalMap");

  if(document.getElementById("closeModal")){
      document.getElementById("closeModal").addEventListener("click", () => {
        detailModal.classList.remove("open");
      });
  }
  
  if(detailModal){
      detailModal.addEventListener("click", e => {
        if (e.target === detailModal) detailModal.classList.remove("open");
      });
  }

 function openDetail(item) {
    if(!detailModal) return;
    
    // 1. Set Standard Content
    modalTitle.textContent = item.name;
    modalImg.src           = item.image || "";
    modalMap.src           = item.mapEmbed || "";

    // 2. Build Description with Contact Info (Address, Phone, Email)
    let content = item.description || "No description available.";

    if(item.address) {
      content += `<br><br><strong>📍 Location:</strong> ${item.address}`;
    }
    if(item.hours) {
      content += `<br><strong>⏰ Hours:</strong> ${item.hours}`;
    }
    if(item.phone) {
      content += `<br><strong>📞 Phone:</strong> <a href="tel:${item.phone.trim()}">${item.phone}</a>`;
    }
    if(item.email) {
      content += `<br><strong>📧 Email:</strong> <a href="mailto:${item.email}">${item.email}</a>`;
    }

    // Use innerHTML to make bold text and links work
    modalDesc.innerHTML = content;

    // 3. VISIT WEBSITE BUTTON LOGIC
    // Check if the button already exists; if not, create it.
    let linkBtn = document.getElementById('modalActionBtn');
    
    if (!linkBtn) {
      linkBtn = document.createElement('a');
      linkBtn.id = 'modalActionBtn';
      
      // Styling the button via JS to ensure it looks good immediately
      linkBtn.className = 'nav-btn'; 
      linkBtn.style.display = 'block';
      linkBtn.style.textAlign = 'center';
      linkBtn.style.margin = '15px 0';
      linkBtn.style.padding = '12px';
      linkBtn.style.backgroundColor = '#fff';
      linkBtn.style.color = '#000';
      linkBtn.style.fontWeight = 'bold';
      linkBtn.style.textDecoration = 'none';
      linkBtn.style.borderRadius = '10px';
      linkBtn.target = "_blank"; // Opens in new tab
      linkBtn.textContent = "VISIT WEBSITE";
      
      // Insert the button BEFORE the map
      const mapContainer = document.querySelector('.modal-map');
      if(mapContainer) {
        mapContainer.parentNode.insertBefore(linkBtn, mapContainer);
      }
    }

    // 4. Show or Hide the button based on if 'link' exists in data
    if (item.link) {
      linkBtn.href = item.link;
      linkBtn.style.display = 'block';
    } else {
      linkBtn.style.display = 'none';
    }

    // 5. Open the Modal
    detailModal.classList.add("open");
  }


  // =======================================================
  //                 DATA SECTION (COMPLETE)
  // =======================================================

  // 1. MUNICIPALITIES
  const municipalities = [
    { name: "Angeles City", image:"https://citiesinvestmentfacility.org/wp-content/uploads/2021/06/4-scaled-1.jpg", description:"Angeles City, located in Pampanga within Central Luzon, is a highly urbanized city that remains politically independent from the province. It is home to historic landmarks such as the 19th-century Holy Rosary Church, the 1890s Pamintuan Mansion, and the 1824 Founders’ Residence, with local heritage showcased at Museo Ning Angeles. West of the city lies Mount Pinatubo, an active volcano. The city’s name, derived from El Pueblo de los Angeles (“Town of the Angels”), honors its patron saints and founder Don Angel Pantaleón de Miranda. According to the 2015 census, Angeles had a population of 411,634 and was once ranked among the “Best Places to Live in the Philippines.", mapEmbed:"https://www.google.com/maps?q=Angeles+City&output=embed" },
    { name: "Apalit", image:"https://upload.wikimedia.org/wikipedia/commons/1/1c/Apalit_Church%2C_Pampanga%2C_Sep_2025_%281%29.jpg", description:"Apalit is a first-class municipality in Pampanga, covering 61.47 square kilometers and home to over 117,000 residents. Known as “Pampanga’s Gateway to Manila,” it serves as a key transit point between Metro Manila and northern Pampanga, strategically located along the MacArthur Highway. The town, named after the apalit tree, is rich in religious tradition, hosting the Apung Iru Fluvial Festival every June in honor of Saint Peter. Apalit is also famous for its skilled blacksmiths, earning the title “The Blacksmith Capital of Pampanga.” Under Mayor Oscar D. Tetangco Jr., the municipality has focused on infrastructure and public service improvements, positioning itself as a growing economic and cultural hub in the region.", mapEmbed:"https://www.google.com/maps?q=Apalit+Pampanga&output=embed" },
    { name: "Arayat", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/5b/Arayat_Church%2C_Pampanga%2C_July_2023.jpg/2560px-Arayat_Church%2C_Pampanga%2C_July_2023.jpg", description:"Arayat is a dormant stratovolcano in Pampanga, Philippines, known for its twin peaks, which rise 1,033 meters and are popular for hiking and tourism. The mountain is a prominent landmark in the Central Luzon plains and is considered a potentially active volcano, though it has no historical eruptions recorded. It is a habitat for diverse wildlife and has a significant role in local folklore, being associated with the diwata (goddess) Mariang Sinukuan.", mapEmbed:"https://www.google.com/maps?q=Arayat+Pampanga&output=embed" },
    { name: "Bacolor", image:"https://upload.wikimedia.org/wikipedia/commons/b/b9/Bacolor_Church%2C_Pampanga%2C_Jun_2024_%281%29.jpg", description:"Bacolor, a 3rd-class municipality in Pampanga’s 2nd district, has a population of about 48,066 and lies southwest of San Fernando. Once the provincial capital and briefly the capital of the Philippines during the 1762 British invasion, it earned the title Villa de Bacolor in the Spanish era. The town is renowned for its resilience after the 1991 Mount Pinatubo eruption, which buried most of its barangays in lahar, leaving the half-buried San Guillermo Parish Church as a symbol of survival. Today, Bacolor thrives through agriculture, tourism, and its famed woodcarving tradition celebrated in the Dukit Festival, while continuing to preserve its heritage and identity.", mapEmbed:"https://www.google.com/maps?q=Bacolor+Pampanga&output=embed" },
    { name: "Candaba", image:"https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjVTfJdH3y-rsOZlaeQIy4T2Q7MKHnBD08po_PWqBDWNshi1qwZMdQcIO4bZUKkKGefIR8gC5P8mpVVfRfk-kHauY5C4AINmpemipiC_tO7Lcl06sDRjGnvUvXk9C_sC0OLUVKRTfigFD2gdBTZ_D1B_9iR8RCbA9qH3pj3sQuMI8ZpOgekyRut9FbZ3g/s1024/Virgen%20de%20Lourdes%20Parish%20-%20Talang,%20Candaba,%20Pampanga.jpeg", description:"Candaba, the largest town in Pampanga by land area, is a first-class municipality in the 4th district with a population of about 119,000. It is most famous for the Candaba Swamp, a seasonal floodplain that hosts thousands of migratory birds each year, making it a prime destination for birdwatchers and ecotourists. One of Pampanga’s earliest settlements, its name reflects the seasonal flooding that shapes its farming traditions, with rice and vegetables as key products. The town celebrates the Ibon-Ebon Festival every February, highlighting both its bird sanctuary and egg industry. Today, Candaba is recognized for balancing ecological conservation with rural development, serving as a model for eco-agriculture and climate resilience.", mapEmbed:"https://www.google.com/maps?q=Candaba+Pampanga&output=embed" },
    { name: "Floridablanca", image:"https://live.staticflickr.com/3738/9611533747_ff68656cdc_b.jpg", description:"Floridablanca, a first-class municipality in Pampanga’s 2nd district, spans 175.5 km² and has a population of about 135,542. Established in 1823 and named after Spanish statesman José Moñino, Count of Floridablanca, it was once part of Lubao before becoming independent due to its agricultural growth. The town is known for rice production and celebrates the Duman Festival, highlighting its culinary heritage. It is also home to the Philippine Air Force’s Basa Air Base, adding to its strategic importance. Today, Floridablanca focuses on infrastructure, eco-tourism, and sustainable farming, blending military legacy, cultural pride, and resilience.", mapEmbed:"https://www.google.com/maps?q=Floridablanca+Pampanga&output=embed" },
    { name: "Guagua", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Betis_Church%2C_Guagua%2C_Pampanga%2C_Jun_2024_%281%29.jpg/1200px-Betis_Church%2C_Guagua%2C_Pampanga%2C_Jun_2024_%281%29.jpg", description:"Guagua, a first-class municipality in Pampanga’s 2nd district, has a population of about 128,893 and covers 48.56 km². Situated along the Pasak River, its name comes from the Kapampangan word Wawa (“river mouth”), reflecting its early role as a trading port. Founded in the Spanish colonial era, it became a hub of religion and education, with landmarks like the 1600s Santa Maria Parish Church. Today, Guagua is known for furniture-making, metalworks, and agriculture, while celebrating its town fiesta every December 8 in honor of the Immaculate Conception. Under Mayor AJ Torres, the municipality emphasizes modernization, heritage preservation, and strong governance, making it one of Pampanga’s most culturally rich towns.", mapEmbed:"https://www.google.com/maps?q=Guagua+Pampanga&output=embed" },
    { name: "Lubao", image:"https://upload.wikimedia.org/wikipedia/commons/4/4a/Jf4308Saint_Augustine_Parish_Church_Exterior_Lubaofvf_03.JPG", description:"Lubao, a first-class municipality in Pampanga’s 2nd district, is one of the province’s most populous towns with about 173,502 residents. Founded in 1572, it is among the oldest towns in Pampanga and is notable as the birthplace of Presidents Diosdado Macapagal and Gloria Macapagal Arroyo. The San Agustin Church, built in the early 1600s, stands as a National Historical Landmark and symbol of its colonial heritage. Known for agriculture and hosting the Lubao International Balloon and Music Festival, the town blends tradition with tourism. Under Mayor Esmeralda “Mally” Pineda, Lubao continues to focus on eco-tourism, infrastructure, and flood resilience, making it a progressive and culturally rich municipality.", mapEmbed:"https://www.google.com/maps?q=Lubao+Pampanga&output=embed" },
    { name: "Mabalacat City", image:"https://live.staticflickr.com/5147/5637967074_f378abba4c_b.jpg", description:"Mabalacat, a component city in Pampanga’s 1st district, was officially converted from a municipality in 2012 and now spans 165.8 km² with a population of about 293,000. It borders Angeles City, Magalang, Bamban, and Porac, and includes part of the Clark Freeport Zone, making it a hub for business, logistics, and travel through Clark International Airport. Founded in the 1700s and named after the balacat tree, it honors its Aeta heritage through the Caragan Festival and celebrates its fiesta every February 2. Heritage sites like the Mabalacat Church and Dolores ancestral houses reflect its colonial past. Under Mayor Cris Garbo, the city emphasizes sustainable development, education, and governance, positioning Mabalacat as a dynamic and culturally rooted urban center.", mapEmbed:"https://www.google.com/maps?q=Mabalacat+Pampanga&output=embed" },
    { name: "Macabebe", image:"https://live.staticflickr.com/2409/5754310245_966984cec7_c.jpg", description:"Macabebe, a first-class municipality in Pampanga’s 4th district, has a population of about 78,000 and covers 105.15 km² along the Pampanga River delta. Known for its fishing communities and fertile lowlands, its name comes from the Kapampangan word bebe (“shore”). Historically, Macabebe warriors fought with Rajah Sulayman against Spanish forces in 1571, marking it as an early symbol of resistance. Today, the town celebrates its fiesta every June 29 with fluvial processions in honor of Saint Peter the Apostle. Under Mayor Leonardo “Bobong” Flores, Macabebe continues to strengthen flood control, livelihood programs, and heritage preservation, reflecting its resilience and cultural pride.", mapEmbed:"https://www.google.com/maps?q=Macabebe+Pampanga&output=embed" },
    { name: "Magalang", image:"https://static.where-e.com/Philippines/Central_Luzon_Region/San-Bartolome-Parish-Magalang_5484cdc085db95aaa814af5c84db8fa0.jpg", description:"Magalang, a first-class municipality in Pampanga’s 1st district, has a population of about 124,000 and covers 97.32 km² at the foot of Mount Arayat. Known for rice, sugarcane, and mango farming, it is also home to the Pampanga State Agricultural University, a hub for agricultural education and research. Founded in the 1600s, the town played a role in the Philippine Revolution and honors General Servillano Aquino, a local hero. Its fiesta every July 22 celebrates Saint Bartholomew, with cultural and religious events centered around the historic San Bartolome Parish Church. Under Mayor Maria Lourdes Paras-Lacson, Magalang emphasizes agri-tourism, education, and resilience, making it a progressive and culturally rich municipality.", mapEmbed:"https://www.google.com/maps?q=Magalang+Pampanga&output=embed" },
    { name: "Masantol", image:"https://live.staticflickr.com/3777/9651053449_a332182aa2_b.jpg", description:"Masantol, a third-class municipality in Pampanga’s 4th district, has a population of about 57,990 and covers 48.25 km². Known for its flood-prone terrain along the Pampanga River delta, the town’s economy and culture revolve around fishing, aquaculture, and river transport. Once part of Macabebe until 1878, it is celebrated for fluvial traditions like the Apung Iru Procession and its annual fiesta every June 29 in honor of Saint Peter the Apostle. Despite frequent flooding and typhoons, Masantol continues to rebuild and preserve its heritage. Under Mayor Danilo Guintu, the municipality emphasizes disaster preparedness, sustainable fishing, and community development, embodying resilience and coastal pride.", mapEmbed:"https://www.google.com/maps?q=Masantol+Pampanga&output=embed" },
    { name: "Mexico", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Sta._Monica_Church%2C_Mexico%2C_Pampanga_%281%29.jpg/1200px-Sta._Monica_Church%2C_Mexico%2C_Pampanga_%281%29.jpg", description:"Mexico, a first-class municipality in Pampanga’s 3rd district, has a population of about 173,403 and spans 117.41 km². Strategically located along major highways, it serves as a key agricultural and commercial hub, with rice, sugarcane, and mangoes as major products. Founded in the early 1600s, it was once the capital of Pampanga and is home to the historic 17th-century Santa Monica Parish Church. The town celebrates its fiesta every May 4 in honor of Saint Monica and hosts the Mango Festival to showcase local produce and crafts. Under Mayor Teddy Tumang, Mexico emphasizes infrastructure, education, and tourism, making it one of Pampanga’s most vibrant municipalities", mapEmbed:"https://www.google.com/maps?q=Mexico+Pampanga&output=embed" },
    { name: "Minalin", image:"https://upload.wikimedia.org/wikipedia/commons/b/b4/Sta._Monica_Parish_Church%2C_Minalin%2C_Pampanga_%282%29.jpg", description:"Minalin, a third-class municipality in Pampanga’s 4th district, has a population of about 52,000 and covers 48.27 km² along the Pampanga River floodplains. Known as the “Egg Basket of Central Luzon” for its poultry industry, the town’s identity has long been shaped by seasonal flooding and resilience. Founded in the early 1600s, its name reflects the relocation of settlers due to floods, and it celebrates its fiesta every December 10 in honor of Saint Monica. Minalin is also famous for the Aguman Sanduk Festival on New Year’s Day, a unique tradition where men dress as women in a symbolic parade of unity and humor. Under Mayor Edgardo Flores, the municipality emphasizes agricultural modernization, flood control, and cultural preservation, making it one of Pampanga’s most spirited communities.", mapEmbed:"https://www.google.com/maps?q=Minalin+Pampanga&output=embed" },
    { name: "Porac", image:"https://upload.wikimedia.org/wikipedia/commons/9/96/Porac_Church%2C_Pampanga%2C_Aug_2025_%281%29.jpg", description:"Porac is the largest municipality in Pampanga, spanning 314 km² and housing about 140,000 residents. Founded in the late 1500s and named after the purac tree, it is home to vibrant Aeta communities and rich cultural traditions. The town is known for festivals like the Ayta Festival and its October 4 fiesta honoring Saint Catherine of Alexandria. Natural attractions such as Miyamit Falls, Dara Falls, and Puning Hot Springs make it a popular eco-tourism destination. Under Mayor Jaime “Jing” Capil, Porac has emphasized inclusive growth, environmental protection, and heritage conservation.", mapEmbed:"https://www.google.com/maps?q=Porac+Pampanga&output=embed" },
    { name: "San Fernando City", image:"https://upload.wikimedia.org/wikipedia/commons/1/1e/Cathedral_of_San_Fernando%2C_Pampanga_%28exterior%29_-_10-11-2024.jpg", description:"San Fernando, the capital of Pampanga, is a major administrative and economic hub in Central Luzon due to its strategic location near key highways, Clark Freeport Zone, and Subic Bay. Founded in 1754 and attaining cityhood in 2001, it is rich in history, with landmarks such as the San Fernando Metropolitan Cathedral and the Pampanga Provincial Capitol. The city is renowned for its Giant Lantern Festival every December, earning it the title “Christmas Capital of the Philippines.” It also celebrates the Pyestang Fernandino, which highlights local culture and cuisine. Under Mayor Vilma Balle Caluag, San Fernando continues to advance inclusive governance, disaster resilience, and digital modernization.", mapEmbed:"https://www.google.com/maps?q=San+Fernando+Pampanga&output=embed" },
    { name: "San Luis", image:"https://upload.wikimedia.org/wikipedia/commons/4/4f/JfChurchPampangaSanLuis199fvf.JPG", description:"San Luis is a fourth-class agricultural municipality in Pampanga with about 57,000 residents and a land area of 57.74 km². Founded in the 18th century, it remains a peaceful farming town known for rice, corn, and vegetable production. Its main landmark is the San Luis Gonzaga Parish Church, and the town celebrates its fiesta every June 21 in honor of Saint Aloysius Gonzaga. Festivals like the Kuraldal Festival highlight its unique blend of devotion and folklore. Under Mayor Jayson Sagum, San Luis continues to strengthen agriculture, education, and disaster resilience, especially in flood-prone areas.", mapEmbed:"https://www.google.com/maps?q=San+Luis+Pampanga&output=embed" },
    { name: "San Simon", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f0/FvfSanSimonChurch9509_05.JPG/1200px-FvfSanSimonChurch9509_05.JPG", description:"San Simon is a third-class municipality in Pampanga, with a population of around 59,000 and a land area of 57.74 km². It is strategically located along the North Luzon Expressway (NLEX), giving it easy access to Metro Manila and northern provinces. Founded in the 1700s and named after Saint Simon the Zealot, the town celebrates its fiesta on October 28 with cultural events and religious observances centered around the San Simon Parish Church. Traditionally agricultural, it has evolved into an industrial hub, particularly in warehousing, manufacturing, and logistics. Under Mayor Abundio “Jun” Punsalan Jr., San Simon focuses on infrastructure, business development, and public service modernization.", mapEmbed:"https://www.google.com/maps?q=San+Simon+Pampanga&output=embed" },
    { name: "Santa Ana", image:"https://upload.wikimedia.org/wikipedia/commons/d/d2/Santa_Ana_Church_facade_%28Santa_Ana%2C_Pampanga%29.jpg", description:"Santa Ana is a third-class municipality in Pampanga with a population of about 61,500 and a land area of 39.84 km². Founded in 1598, it was named after Saint Anne and celebrates its fiesta every July 26 in her honor. The town is primarily agricultural, producing rice, corn, and vegetables, with small-scale industries supporting local livelihoods. Its historical centerpiece is the Santa Ana Church, built during the Spanish colonial period. Under Mayor Engr. Ferdinand P. Labung, the municipality is focused on improving infrastructure, education, and disaster resilience while maintaining its rich cultural heritage.", mapEmbed:"https://www.google.com/maps?q=Santa+Ana+Pampanga&output=embed" },
    { name: "Santa Rita", image:"https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/ee/39/f7/caption.jpg?w=1200&h=-1&s=1", description:"Santa Rita is one of Pampanga’s smallest municipalities, covering only 29.76 km² and home to about 48,000 residents, yet it remains agriculturally productive with crops like rice, sugarcane, and fruits. Founded in 1697 in the area once called Gasac, it became a separate town in 1724 and was named after Saint Rita of Cascia, whose parish church serves as a key historical landmark. The town is famous for its turrón de casuy, a beloved local delicacy. Every May 22, Santa Rita celebrates its fiesta with religious and cultural festivities in honor of its patron saint. Under Mayor Reynan S. Calo, the municipality continues to pursue modernization while preserving its heritage through its “Bayung Santa Rita” vision.", mapEmbed:"https://www.google.com/maps?q=Santa+Rita+Pampanga&output=embed" },
    { name: "Santo Tomas", image:"https://stotomaspampangagov.ph/chilsexu/2023/04/St.-Thomas-the-Apostle-Parish-Church-2-scaled.jpg", description:"Santo Tomas is the smallest municipality in Pampanga, with a population of about 42,000 and a land area of just 21.3 km². Despite its size, it is known for its rice farming, fishing, and traditional pottery-making, particularly in Barangay San Vicente, where artisans craft clay pots using techniques passed down through generations. Founded in the early 1800s and named after Saint Thomas the Apostle, the town celebrates its fiesta every July 3 with religious and cultural events centered around the Santo Tomas Parish Church. Under Mayor John Sambo, the municipality has focused on supporting local livelihoods, improving infrastructure, and preserving its cultural heritage. Santo Tomas remains a vibrant and proud community with a strong sense of tradition and civic engagement.", mapEmbed:"https://www.google.com/maps?q=Santo+Tomas+Pampanga&output=embed" },
    { name: "Sasmuan", image:"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f2/Jf2369Saint_Lucy_Parish_Church_Sasmuan_Pampangafvf_23.JPG/2560px-Jf2369Saint_Lucy_Parish_Church_Sasmuan_Pampangafvf_23.JPG", description:"Sasmuan is a fourth-class municipality in Pampanga, with a population of around 29,000 and a land area of 44.55 km². Located along the Manila Bay coastline, it is known for its fishing industry, particularly shrimp and tilapia farming, as well as its proximity to the Sasmuan Bangkung Malapad Critical Habitat, a key area for wetland conservation and birdwatching. Originally called Sexmoan during the Spanish colonial era, the town celebrates its fiesta on January 20 in honor of Saint Lucy, with religious processions and the unique Kuraldal Festival, a street dance ritual of prayer and thanksgiving. The Santa Lucia Parish Church, built in the 1600s, remains a central landmark. Under Mayor Jesus “Bon” Sagum Jr., Sasmuan has focused on eco-tourism, disaster resilience, and environmental preservation, particularly through mangrove reforestation and community-based conservation efforts.", mapEmbed:"https://www.google.com/maps?q=Sasmuan+Pampanga&output=embed" }
  ];

  // 2. ATTRACTIONS (Complete)
  // 2. ATTRACTIONS (Updated with City Tags)
  const attractions = [
    {
    name: "Dinosaurs Island Clark",
    city: "Clark Freeport Zone",
    image: "https://www.hannresorts.com/wp-content/uploads/2024/02/DINO-ISLAND-1600x900.jpg",
    description: "Dinosaurs Island is an animatronic theme park and museum designed to offer visitors a unique, interactive learning experience about the dinosaur era with life-sized creatures. It is located in Clark Freeport Zone, Pampanga.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 917 123 4567",
    email: "info@dinosaursislandclark.com",
    link: "https://www.dinosaursisland.com/",
    mapEmbed: "https://www.google.com/maps?q=Dinosaurs+Island+Clark&output=embed"
  },
  {
    name: "Holy Rosary Parish Church",
    city: "Angeles City",
    image: "https://d384rxa9e2cak.cloudfront.net/public/churchbanners/churches_1463491462_2606_6810.jpg",
    description: "The Holy Rosary Parish Church, also known as Santo Rosario Church or Pisamban Maragul (transl. “Big Church”), is a Roman Catholic church located in Angeles City, Philippines. It falls under the jurisdiction of the Archdiocese of San Fernando. Situated at the heart of the old town of Angeles (formerly Barrio Culiat of San Fernando, Pampanga), the church is recognized by the National Commission for Culture and the Arts as a national historical site and by the National Museum of the Philippines as an important cultural property.",
    address: "Holy Rosary St., Angeles City, Pampanga",
    hours: "Open Daily 6:00 AM - 8:00 PM",
    phone: "+63 45 625 1234",
    email: "contact@holyrosaryangeles.ph",
    link: "https://www.holyrosaryangeles.ph/",
    mapEmbed: "https://www.google.com/maps?q=Holy+Rosary+Parish+Church+Angeles&output=embed"
  },
  {
    name: "Pamintuan Mansion",
    city: "Angeles City",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Angeles_City_%2853946377250%29.jpg",
    description: "The Pamintuan Mansion is a historic building in Angeles City, Pampanga built by the Pamintuan family in the 1880s. It was briefly used by the Katipunan during the Philippine-American War. It currently hosts a social science museum.",
    address: "V. Angeles St., Angeles City, Pampanga",
    hours: "Open Daily 8:00 AM - 5:00 PM",
    phone: "+63 45 888 5678",
    email: "info@pamintuanmansion.com",
    link: "https://www.pamintuanmansion.com/",
    mapEmbed: "https://www.google.com/maps?q=Pamintuan+Mansion+Angeles&output=embed"
  },
  {
    name: "Clark Parade Grounds",
    city: "Clark Freeport Zone",
    image: "https://static.wixstatic.com/media/2569d1_d8e2346f1e7a409083ef3fac0d652488~mv2.jpg/v1/fill/w_560,h_400,al_c,q_80,usm_0.66_1.00_0.01,enc_avif,quality_auto/2569d1_d8e2346f1e7a409083ef3fac0d652488~mv2.jpg",
    description: "The Clark Parade Grounds is a vast open area located in the Clark Freeport Zone, Pampanga, Philippines. Originally established as a U.S. military parade field, it has since become a popular destination for recreational activities such as jogging, picnicking, and hosting major cultural and sports events. The site is well known for its scenic walking paths, historical markers, and versatile sports facilities.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 5:00 AM - 9:00 PM",
    phone: "+63 45 499 1234",
    email: "info@clarkparadegrounds.com",
    link: "https://www.clarkparadegrounds.com/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Parade+Grounds&output=embed"
  },
  {
    name: "Aqua Planet",
    city: "Clark Freeport Zone",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/ff/c7/11/the-biggest-water-theme.jpg?w=800&h=500&s=1",
    description: "Aqua Planet is a 10-hectare water theme park located within the Clark Freeport Zone in Pampanga, Philippines. It is recognized as the country’s newest and most modern water park, featuring 38 water slides and attractions designed for guests of all ages. As the first phase of a 122-hectare integrated resort project in the rapidly developing Freeport area, Aqua Planet also provides facilities that accommodate guests with disabilities. For food, beverages, and shopping, visitors can enjoy eight designated shop-and-dine areas—offering a complete, all-in entertainment experience.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 917 234 5678",
    email: "info@aquaplanet.com.ph",
    link: "https://www.aquaplanet.com.ph/",
    mapEmbed: "https://www.google.com/maps?q=Aqua+Planet+Clark&output=embed"
  },

  // Next batch
  {
    name: "Apung Mamacalulu",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/7f/51/64/facade-of-the-shrine.jpg?w=900&h=-1&s=1",
    description: "Apung Mamacalulu (The Merciful Lord, Our Lord of Great Mercy), also known as the Santo Entierro (Holy Burial) of Angeles City, is a revered statue depicting the burial of Jesus Christ. It is enshrined at the Archdiocesan Shrine of Christ our Lord of the Holy Sepulchre in Lourdes Sur, Angeles City, Philippines. Every Friday, thousands of devotees gather at the shrine to attend the special Holy Mass in honor of Apung Mamacalulu.",
    address: "P. Zamora St., Angeles City, Pampanga",
    hours: "Open Daily 6:00 AM - 8:00 PM",
    phone: "+63 45 625 1122",
    email: "info@apungmamacalulu.ph",
    link: "https://www.apungmamacalulu.ph/",
    mapEmbed: "https://www.google.com/maps?q=Apung+Mamacalulu+Angeles&output=embed"
  },
  {
    name: "Deca Wake Park Clark",
    city: "Clark Freeport Zone",
    image: "https://farm9.staticflickr.com/8765/17152931549_ed5608e873_z.jpg",
    description: " It features a full-size main cable for experienced riders and a separate beginner's area with a slower speed and lower water level, often called the Little Bro course. The park offers rentals and lessons for various skill levels, and has other amenities like restaurants and a lounge area. ",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 8:00 AM - 6:00 PM",
    phone: "+63 917 345 6789",
    email: "info@decawakepark.com",
    link: "https://www.decawakepark.com/",
    mapEmbed: "https://www.google.com/maps?q=Deca+Wake+Park+Clark&output=embed"
  },
  {
    name: "Clark Air Force City Park",
    city: "Clark Freeport Zone",
    image: "https://static.where-e.com/Philippines/Central_Luzon_Region/Pampanga/Air-Force-City-Park_4cda214d9f2ad184eeb1351539cfd51f.jpg",
    description: "Air Force City Park is a recreational complex that features real helicopters, fighter jets, and. aviation equipment used by the Armed Forces of the Philippines and the United States. It is located within the Clark Freeport Zone in Pampanga, 96 kilometers north of Manila.",
    address: "Clark Air Base, Pampanga",
    hours: "Open Daily 5:00 AM - 9:00 PM",
    phone: "+63 45 499 2233",
    email: "info@clarkairforcepark.ph",
    link: "https://www.clarkairforcepark.ph/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Air+Force+City+Park&output=embed"
  },
  {
    name: "Clark Museum and 4D Theater",
    city: "Clark Freeport Zone",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0e/52/b1/6d/20170115-133037-largejpg.jpg?w=1200&h=-1&s=1",
    description: " On the edge of the former American parade grounds, this well-presented museum details the history of Clark from 1901 up to its development of the Freeport Zone. It includes some great military memorabilia, photos and displays on Mt Pinatubo's dramatic eruption. and info on the indigenous Aeta.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 9:00 AM - 5:00 PM",
    phone: "+63 45 499 3344",
    email: "info@clarkmuseum.com",
    link: "https://www.clarkmuseum.com/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Museum+and+4D+Theater&output=embed"
  },
  {
    name: "Museu Ning Angeles",
    city: "Angeles City",
    image: "https://gttp.images.tshiftcdn.com/496914/x/0/museo-ning-angeles.jpg",
    description: "Local museum showcasing Pampanga’s art, culture, and history.",
    address: "V. Angeles St., Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 45 625 4433",
    email: "info@museuningangeles.ph",
    link: "https://www.museuningangeles.ph/",
    mapEmbed: "https://www.google.com/maps?q=Museu+Ning+Angeles&output=embed"
  },
  {
    name: "SM City Clark",
    city: "Clark Freeport Zone",
    image: "https://philippinesgraphic.com.ph/wp-content/uploads/2024/10/Mall-Facade-Clark.png",
    description: "Large shopping mall with retail stores, dining, and entertainment.",
    address: "M.A. Roxas Highway, Clark Freeport Zone, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 45 499 7788",
    email: "smcityclark@sm.com",
    link: "https://www.smcityclark.com/",
    mapEmbed: "https://www.google.com/maps?q=SM+City+Clark&output=embed"
  },
  {
    name: "Puning Hot Spring",
    city: "Porac, Pampanga",
    image: "https://www.filipinotravel.com.ph/wp-content/uploads/2016/07/Puning-Hot-Spring.jpg",
    description: "Unwind in lush volcanic surroundings with multiple hot spring pools, each with different temperatures to suit your mood. The journey begins with an exciting 4x4 ride through scenic routes, leading to unique experiences like volcanic mud packs, warm sand therapy, and natural spring baths. Visitors say the delicious local buffet and refreshing drinks are a highlight. Many travelers recommend booking ahead and planning transportation in advance for a smooth, relaxing day surrounded by stunning views and rejuvenating treatments.",
    address: "Porac, Pampanga",
    hours: "Open Daily 6:00 AM - 8:00 PM",
    phone: "+63 917 112 3344",
    email: "info@puninghotspring.com",
    link: "https://www.puninghotspring.com/",
    mapEmbed: "https://www.google.com/maps?q=Puning+Hot+Spring&output=embed"
  },
  {
    name: "Fields Avenue (Walking Street / Red Street)",
    city: "Angeles City",
    image: "https://blueforestonwetboots.com/app/uploads/2018/09/Walking-Street.jpg",
    description: "Famous nightlife street with bars, clubs, and entertainment.",
    address: "Balibago, Angeles City, Pampanga",
    hours: "Open Daily 6:00 PM - 3:00 AM",
    phone: "+63 45 888 1122",
    email: "info@fieldsavenueangeles.com",
    link: "https://www.fieldsavenueangeles.com/",
    mapEmbed: "https://www.google.com/maps?q=Fields+Avenue+Angeles&output=embed"
  },
  {
    name: "Bayanihan Park",
    city: "Angeles City",
    image: "https://lh6.googleusercontent.com/proxy/8j6ASCmtCwC4YF3ViXzOWkd5QRqN-I6C5tBowAXbytyjg0kWFmls9iI-3Bq72S0Jl5wkIiwLamW2wX2ILSE-EJt4iNeS",
    description: " It is formerly known as Astro Park. One of the major landmarks of the city of Angeles, the Salakot Arch, is situated inside the park. The structure's roof resembles that of a salakot, a traditional hat. It was built during the administration of then-President Ferdinand Marcos to commemorate the revision of the Military Bases Agreement between the Philippine and United States government in 1979.",
    address: "M.A. Roxas Highway, Angeles City, Pampanga",
    hours: "Open Daily 5:00 AM - 9:00 PM",
    phone: "+63 45 625 2211",
    email: "info@bayanihanpark.com",
    link: "https://www.bayanihanpark.com/",
    mapEmbed: "https://www.google.com/maps?q=Bayanihan+Park+Angeles&output=embed"
  },
  {
    name: "Zoocobia Fun Zoo",
    city: "Clark Freeport Zone",
    image: "https://www.zoomanity.com.ph/wp-content/uploads/2017/07/Zoocobia-1-768x431.jpg",
    description: "Zoocobia Fun Zoo Theme Park is a popular tourist destination for families and is open daily. Located in Calumpang, it is home to a variety of amazing bird species, as well as several endemic animals native to the Philippines. Among its most loved attractions are the Menagerie and Mango Camp. Aside from observing birds and animals, visitors can also enjoy camel rides, go-karts, zipline swings, and many other fun activities.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 8:00 AM - 5:00 PM",
    phone: "+63 917 334 5566",
    email: "info@zoocobia.com",
    link: "https://www.zoocobia.com/",
    mapEmbed: "https://www.google.com/maps?q=Zoocobia+Fun+Zoo&output=embed"
  },
  {
    name: "Science Museum",
    city: "Clark Freeport Zone",
    image: "https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1200,h_630/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/tl9dbbdtmuqeqync8lir/SciENSE%20Museum%20Ticket%20in%20Clark.jpg",
    description: "Interactive museum showcasing science exhibits and educational activities.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 9:00 AM - 5:00 PM",
    phone: "+63 45 499 5566",
    email: "info@clarksciencemuseum.com",
    link: "https://www.clarksciencemuseum.com/",
    mapEmbed: "https://www.google.com/maps?q=Science+Museum+Clark&output=embed"
  },
  {
    name: "Mimosa Plus Golf Course",
    city: "Clark Freeport Zone",
    image: "https://www.filinvestgroup.com/wp-content/uploads/2024/09/Mimosa-Plus-Golf-Course-Aerial-View-scaled.jpg",
    description: "18-hole golf course within Mimosa Leisure Estate, perfect for golf enthusiasts.",
    address: "Mimosa Leisure Estate, Clark Freeport Zone, Pampanga",
    hours: "Open Daily 6:00 AM - 6:00 PM",
    phone: "+63 45 499 6677",
    email: "info@mimosagolf.com",
    link: "https://www.mimosagolf.com/",
    mapEmbed: "https://www.google.com/maps?q=Mimosa+Plus+Golf+Course&output=embed"
  },
  {
    name: "Green Asia ATV Leisure in Clark",
    city: "Clark Freeport Zone",
    image: "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/472063899_591143536999810_3494605608262873570_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeGt2Q23g1MWoM6VK4etaBDC5iXCQqVW4rfmJcJCpVbit9qn10ZAjTlYVcu96y7k_Rcb07saw6dQ4tnsROgaZbzg&_nc_ohc=_57wLH6GwMUQ7kNvwHUMwJ8&_nc_oc=AdmAS-Osjp-HJ_yGKlo7td7vM4sonMpGkNG_6PrRZnSZ3aB89L77nxQUh0bY7bfMzlo&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=IHpggNHqZyb9tbgeIlOutg&oh=00_AfhRIlxh91ATfH5Ba8NfQ2wPXIvCQ5Fsc1J6X5Tk8bF_rQ&oe=692A3CF9",
    description: "Adventure park offering ATV rides and off-road fun.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 8:00 AM - 5:00 PM",
    phone: "+63 917 445 7788",
    email: "info@greenasiaatv.com",
    link: "https://www.greenasiaatv.com/",
    mapEmbed: "https://www.google.com/maps?q=Green+Asia+ATV+Clark&output=embed"
  },
  {
    name: "Clark Safari and Adventure Park",
    city: "Clark Freeport Zone",
    image: "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL2RiNmM4OTQwZDI4MjQ4YzY5Njg5MTI1MjkyZjkyYjIxIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo2NDAsImhlaWdodCI6NjQwLCJmaXQiOiJpbnNpZGUifSwicm90YXRlIjpudWxsLCJ0b0Zvcm1hdCI6ICJ3ZWJwIn19",
    description: "Clark Safari and Adventure Park is a 40-hectare attraction in Clark, Pampanga, that opened in December 2021. It features a variety of animals, including lions, tigers, bears, and monkeys, with opportunities for animal encounters like feeding sessions. Visitors can also enjoy safari-themed rides and live entertainment, including cultural performances from the Aeta tribes.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 8:00 AM - 6:00 PM",
    phone: "+63 917 556 8899",
    email: "info@clarksafari.com",
    link: "https://www.clarksafari.com/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Safari+and+Adventure+Park&output=embed"
  },
 {
    name: "SandBox at Alviera",
    city: "Porac, Pampanga",
    image: "https://www.alviera.ph/wp-content/uploads/2021/03/sandbox2-1.jpeg",
    description: "Adventure park featuring zip lines, obstacle courses, and outdoor activities.",
    address: "Alviera, Porac, Pampanga",
    hours: "Open Daily 8:00 AM - 6:00 PM",
    phone: "+63 917 667 8899",
    email: "info@sandboxalviera.com",
    link: "https://www.sandboxalviera.com/",
    mapEmbed: "https://www.google.com/maps?q=SandBox+Alviera&output=embed"
  },
  {
    name: "Center for Kapampangan Study",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/18/6a/ac/97/photo2jpg.jpg?w=900&h=500&s=1",
    description: "Juan D. Nepomuceno Center for Kapampangan Studies is dedicated to preserving and promoting Kapampangan identity. It features multiple museums, including the Pinatubo Museum and Museum of Kapampangan Arts, as well as archives, a library, and a theater for cultural screenings and lectures.",
    address: "V. Angeles St., Angeles City, Pampanga",
    hours: "Open Daily 8:00 AM - 5:00 PM",
    phone: "+63 45 625 9988",
    email: "info@kapampangancenter.com",
    link: "https://www.kapampangancenter.com/",
    mapEmbed: "https://www.google.com/maps?q=Center+for+Kapampangan+Study&output=embed"
  },
  {
    name: "Nayong Pilipino Clark",
    city: "Clark Freeport Zone",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/4f/da/9c/nayong-pilipino.jpg?w=1200&h=-1&s=1",
    description: "Cultural theme park showcasing Philippine history, culture, and traditional villages.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 917 778 8899",
    email: "info@nayongpilipinoclark.com",
    link: "https://www.nayongpilipinoclark.com/",
    mapEmbed: "https://www.google.com/maps?q=Nayong+Pilipino+Clark&output=embed"
  },
  {
    name: "Tutu Lari Avatar George",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/7c/83/e1/tutulari-avatar-gorge.jpg?w=900&h=500&s=1",
    description: "Tutulari Avatar Gorge (often stylized as “Tutu Lari Avatar George”) is named after the Kapampangan word tutulu, meaning “dripping,” reflecting the gorge’s misty, water-veined cliffs. Its cinematic beauty and quiet atmosphere make it a rising eco-tourism destination in Central Luzon.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 917 889 1122",
    email: "info@tutulari.com",
    link: "https://www.tutulari.com/",
    mapEmbed: "https://www.google.com/maps?q=Tutu+Lari+Avatar+George&output=embed"
  },
  {
    name: "Ana-an Falls",
    city: "Porac, Pampanga",
    image: "https://www.pinatubomountainero.com/cdn/shop/files/MajesticAna-anFallsnearClark.jpg?v=1744093097&width=1946",
    description: "Natural waterfall and hiking destination perfect for nature lovers.",
    address: "Porac, Pampanga",
    hours: "Open Daily 6:00 AM - 5:00 PM",
    phone: "+63 917 112 3344",
    email: "info@ana-anfalls.com",
    link: "https://www.ana-anfalls.com/",
    mapEmbed: "https://www.google.com/maps?q=Ana-an+Falls&output=embed"
  },
  {
    name: "Miyamit Falls",
    city: "Porac, Pampanga",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/06/1b/e7/cc/crystal-clear-water.jpg?w=1200&h=-1&s=1",
    description: "Scenic waterfall surrounded by lush forest, ideal for trekking and swimming.",
    address: "Porac, Pampanga",
    hours: "Open Daily 6:00 AM - 5:00 PM",
    phone: "+63 917 223 4455",
    email: "info@miyamitfalls.com",
    link: "https://www.miyamitfalls.com/",
    mapEmbed: "https://www.google.com/maps?q=Miyamit+Falls&output=embed"
  },
  {
    name: "Retro Seoul Roller Skate",
    city: "Angeles City",
    image: "https://retroseoulrollerskates.com/wp-content/uploads/2025/01/465586163_122169616736145501_5716677403380745034_n-1.jpg",
    description: "Roller skating rink with retro Korean theme, suitable for families and groups.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 10:00 PM",
    phone: "+63 917 334 5566",
    email: "info@retroseoulrollerskate.com",
    link: "https://www.retroseoulrollerskate.com/",
    mapEmbed: "https://www.google.com/maps?q=Retro+Seoul+Roller+Skate&output=embed"
  },
  {
    name: "Fontana Leisure Park and Casino",
    city: "Clark Freeport Zone",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/03/c3/05/cf/fontana-leisure-parks.jpg?w=900&h=500&s=1",
    description: "Luxury resort with pools, casino, golf course, and recreational facilities.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 24 Hours",
    phone: "+63 917 445 6677",
    email: "info@fontanaleisure.com",
    link: "https://www.fontanaleisure.com/",
    mapEmbed: "https://www.google.com/maps?q=Fontana+Leisure+Park+and+Casino&output=embed"
  },
  {
    name: "El Kabayo Riding Stables",
    city: "Clark Freeport Zone",
    image: "https://www.hannresorts.com/wp-content/uploads/2024/02/EL-KABAYO-1600x900.jpg",
    description: "Horseback riding and equestrian activities for all skill levels.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 6:00 AM - 6:00 PM",
    phone: "+63 917 556 7788",
    email: "info@elkabayo.com",
    link: "https://www.elkabayo.com/",
    mapEmbed: "https://www.google.com/maps?q=El+Kabayo+Riding+Stables&output=embed"
  },
 {
    name: "Kamikaze East Airfield",
    city: "Clark Freeport Zone",
    image: "https://cdn.statically.io/img/readysteadytravel.net/wp-content/uploads/2023/07/PAW03958-small.jpg?quality=100&f=auto",
    description: "Historical airfield used during World War II, now a landmark site.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 6:00 AM - 6:00 PM",
    phone: "+63 917 667 8899",
    email: "info@kamikazeeastairfield.com",
    link: "https://www.kamikazeeastairfield.com/",
    mapEmbed: "https://www.google.com/maps?q=Kamikaze+East+Airfield&output=embed"
  },
  {
    name: "Casino Filipino",
    city: "Angeles City",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Casino_Filipino_Angeles.jpg",
    description: "Casino Filipino Angeles is a government-owned casino located on MacArthur Highway in Balibago, Angeles City, Pampanga. It features a variety of slot machines and live games like Baccarat, Roulette, and Blackjack, with daily poker games available in the evenings. The casino also has amenities like a ballroom, fitness center, and sometimes hosts live music or events.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 24 Hours",
    phone: "+63 917 778 9900",
    email: "info@casino-filipino.com",
    link: "https://www.casino-filipino.com/",
    mapEmbed: "https://www.google.com/maps?q=Casino+Filipino+Clark&output=embed"
  },
  {
    name: "Clark Air Base Bicentennial Park and Recreation Area",
    city: "Clark Freeport Zone",
    image: "https://gttp.images.tshiftcdn.com/378723/x/0/bicentennial-park",
    description: "The Bicentennial Park is a scenic and vast picnic grounds and recreation area within the Clark Freeport Zone in Pampanga, 99 kilometers north of Manila. It is located along Jose Abad Santos Avenue, near Fort Stotsenburg. It was built in commemoration of the 200th anniversary of American independence from British rule. The Bicentennial Park is among the last remnants of the American military occupation at the Clark Air Base before the US government turned over the base to the Philippine government in 1991. ",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 5:00 AM - 9:00 PM",
    phone: "+63 45 499 7788",
    email: "info@clarkbicentennialpark.com",
    link: "https://www.clarkbicentennialpark.com/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Air+Base+Bicentennial+Park&output=embed"
  },
  {
    name: "D’Heights Resort Golf & Country Club",
    city: "Clark Freeport Zone",
    image: "https://s-light.tiket.photos/t/01E25EBZS3W0FY9GTG6C42E1SE/t_htl-mobile/tix-hotel/images-web/2020/11/25/9a16fad7-6854-47c3-8b62-29d3d6b11890-1606304444691-616c97da4b7118f56a238905a047e612.jpg",
    description: "D'Heights Resort Golf & Country Club is a sprawling 309-hectare integrated resort complex in the Clark Freeport Zone, Pampanga, Philippines. It features a championship 36-hole golf course with stunning views, a world-class casino, the Hilton Hotel, and various amenities including residential villas, a lake promenade, and future developments like shopping and water parks. The golf course is known for its diverse terrain and is a premier destination for both local and tourist golfers.",
    address: "Clark Freeport Zone, Pampanga",
    hours: "Open Daily 6:00 AM - 6:00 PM",
    phone: "+63 917 889 1122",
    email: "info@dheightsresort.com",
    link: "https://www.dheightsresort.com/",
    mapEmbed: "https://www.google.com/maps?q=D%27Heights+Resort+Golf+&+Country+Club&output=embed"
  },
  {
    name: "Marquee Mall",
    city: "Angeles City",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/50/70Marquee_Mall_19.jpg/1200px-70Marquee_Mall_19.jpg",
    description: "MarQuee Mall is a shopping mall owned and operated by the North Beacon Commercial Corporation, a 100% wholly owned subsidiary of Ayala Land. It is located in Barangay Pulung Maragul, Angeles City, Pampanga, Philippines. The mall has a land area of 9.3 hectares and a gross floor area of 140,000 square meters.",
    address: "Marquee Mall, Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 45 625 3344",
    email: "info@marqueemall.com",
    link: "https://www.marqueemall.com/",
    mapEmbed: "https://www.google.com/maps?q=Marquee+Mall+Angeles&output=embed"
  },
  {
    name: "Nepo Mall",
    city: "Angeles City",
    image: "https://malu1.home.blog/wp-content/uploads/2019/01/tlh0d-6.jpg",
    description: "Nepo Mall is a shopping and lifestyle center in Angeles City, Pampanga, Philippines, that blends local and modern stores, dining options, and entertainment. It features a mix of local shops and popular retail brands, a large food court, and various entertainment venues like a cinema. It is part of the larger Nepo Center, which also includes Nepo Mart, Newpoint Mall, and The Quad, and is connected to Newpoint Mall via a skywalk.",
    address: "Nepo Mall, Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 45 625 5566",
    email: "info@nepomall.com",
    link: "https://www.nepomall.com/",
    mapEmbed: "https://www.google.com/maps?q=Nepo+Mall+Angeles&output=embed"
  },
  {
    name: "Nepo Quad",
    city: "Angeles City",
    image: "https://images.squarespace-cdn.com/content/v1/5d7f2d797a64971f017f10ff/23d285bf-6c15-4d3e-9233-8687b0a7bfd8/07-01+ROCKETMAN+P2.png",
    description: "The Nepo Quad is a dining and lifestyle area within Nepo Center in Angeles City, Pampanga, known for its diverse food options, including Filipino restaurants like Aling Lucing and Mila's. It is a popular spot for socializing, offering a cozy ambiance and various eateries alongside other lifestyle businesses in the larger Nepo Center complex, which includes malls and markets.",
    address: "Nepo Quad, Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 45 625 6677",
    email: "info@nepoquad.com",
    link: "https://www.nepoquad.com/",
    mapEmbed: "https://www.google.com/maps?q=Nepo+Quad+Angeles&output=embed"
  },
  {
    name: "Paseo San Jose",
    city: "Angeles City",
    image: "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/482219241_1190044265818608_4768377464991020047_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeECT94CAv31G50AFrzSJDEO7AbSW_CFJWjsBtJb8IUlaBPu0Ik7-95dgHMSBa0stiC7WviG_neQmyeFEjBF12iz&_nc_ohc=Y1KqCgyJguoQ7kNvwGus1hh&_nc_oc=AdllVxg8hBZEe8j8jsNyD7HJhnfvrMHrx8FCsSk1gZRywTTDOG1ldlZeBDpcWZMg2I8&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=kVV5x4khh8RyXd_PyK8jGg&oh=00_AfgpBSAxVYsBiMDbSttOWJBTMLcO1kmL5UG7RWyTJp2cxA&oe=692A2964",
    description: "Paseo San Jose in Angeles City is a small, historic-style street which they called “The Little Vigan City” in the Sto. Rosario area known for a mix of local businesses and residential areas. It features a ladies' dormitory, and several cafes and food stalls, making it a community hub with a focus on lifestyle, convenience, and student life",
    address: "Paseo San Jose, Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 45 625 7788",
    email: "info@paseosanjose.com",
    link: "https://www.paseosanjose.com/",
    mapEmbed: "https://www.google.com/maps?q=Paseo+San+Jose+Angeles&output=embed"
  },
  {
    name: "The Infinity",
    city: "Angeles City",
    image: "https://iorbitnews.com/wp-content/uploads/2022/10/20221017_143850-1024x683.jpeg",
    description: "The Infinity is a large, integrated township and mixed-use development in Angeles City, Pampanga, designed to boost the local economy and quality of life. It features commercial, retail, and educational spaces, as well as recreational areas and modern amenities. Located at a strategic site with direct access to the North Luzon Expressway (NLEX), The Infinity aims to be a central business district for the region, offering a wide range of opportunities and a leisure destination for shopping, dining, and entertainment.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 889 2233",
    email: "info@theinfinity.com",
    link: "https://www.theinfinity.com/",
    mapEmbed: "https://www.google.com/maps?q=The+Infinity+Angeles&output=embed"
  },
  {
    name: "The Culinarium at Museo ning Angeles",
    city: "Angeles City",
    image: "https://thevoicenewsweekly.com/wp-content/uploads/2025/02/The-Culinarium-27.jpg",
    description: "The Culinarium in Angeles City, Pampanga, is a culinary museum and interactive space located at the Museo Ning Angeles dedicated to preserving Kapampangan culinary arts. It features an interactive living kitchen for demonstrations and classes, an exhibit of traditional kitchen and dining setups, and a culinary library. Officially inaugurated in February 2025, the Culinarium aims to promote the region's rich food heritage through practice and display.",
    address: "Museo ning Angeles, Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 6:00 PM",
    phone: "+63 917 778 3344",
    email: "info@culinariumangeles.com",
    link: "https://www.culinariumangeles.com/",
    mapEmbed: "https://www.google.com/maps?q=The+Culinarium+Angeles&output=embed"
  },
  {
    name: "Rock n Bowl",
    city: "Angeles City",
    image: "https://www.majesticdetroit.com/wp-content/uploads/2018/09/bowlingalley_small.jpg",
    description: "Bowling and entertainment center suitable for families and groups.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 12:00 AM",
    phone: "+63 917 334 6677",
    email: "info@rocknbowl.com",
    link: "https://www.rocknbowl.com/",
    mapEmbed: "https://www.google.com/maps?q=Rock+n+Bowl+Angeles&output=embed"
  },
  {
    name: "St. Joseph the Worker - Chapel II",
    city: "Angeles City",
    image: "https://pampangaweddings.com/wp-content/uploads/2021/07/Chapel-2.jpg",
    description: "St. Joseph the Worker - Chapel II, also known as Clark Chapel II, is a Catholic chapel located in Clarkfield, Mabalacat, Pampanga. It is a serene, air-conditioned space that hosts masses and offers a place for prayer and reflection",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 6:00 AM - 8:00 PM",
    phone: "+63 917 112 3344",
    email: "info@stjosephtheworker.com",
    link: "https://www.stjosephtheworker.com/",
    mapEmbed: "https://www.google.com/maps?q=St.+Joseph+the+Worker+Chapel+II&output=embed"
  },
  {
    name: "Splasville PH",
    city: "Angeles City",
    image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/567672132_1363719491784417_2437110500647443911_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHdETy1DdvZnxvizXi3B89ukvcrM0lAjmuS9yszSUCOax30j64uucXg0CKaD7rnJ8vwuHAaej8NUYw2iQTiAYa4&_nc_ohc=MBLrjVr75RoQ7kNvwE7YiEc&_nc_oc=AdlYpJPVM1471Cyt_dmP8kwi6oXPNk9AL8IZlgUKdbhX0b4xhmQ-a8fQsq-krZbFqDc&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=d7SviF060YY4WyYCHW_x0w&oh=00_AfinTx2nz7ybCwOUijCEJ404aQoxQ0ST-fSSDyslSS-xxQ&oe=692A3D63",
    description: "Water park and leisure destination for families and kids.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 6:00 PM",
    phone: "+63 917 223 4455",
    email: "info@splasvilleph.com",
    link: "https://www.splasvilleph.com/",
    mapEmbed: "https://www.google.com/maps?q=Splasville+PH&output=embed"
  }
 ];

  // 3. FOODS (Updated with City Tags)
  const foods = [
     {
    name: "Aling Lucing Sisig",
    city: "Angeles City",
    image: "https://preview.redd.it/naka-dayo-na-ba-kayo-sa-aling-lucings-sisig-v0-uetxzp9j1q0f1.jpeg?auto=webp&s=9c3d1ba25ed7b2779420f3d312959b52185ea78b",
    description: "Aling Lucing is a legendary eatery in Angeles City, Pampanga, hailed as the birthplace of modern sisig—a sizzling Kapampangan dish made from chopped grilled pig’s head, onions, and calamansi. Founded by Lucia “Aling Lucing” Cunanan in the 1970s, the humble carinderia transformed leftover pig parts from Clark Air Base into a national culinary icon. Her innovation turned sisig into a sizzling sensation, earning Pampanga its title as the “Sisig Capital of the Philippines.",
    address: "Balibago, Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 10:00 PM",
    phone: "+63 45 625 1234",
    email: "info@alinglucingsisig.com",
    link: "https://www.alinglucingsisig.com/",
    mapEmbed: "https://www.google.com/maps?q=Aling+Lucing+Sisig+Angeles&output=embed"
  },
  {
    name: "Camalig Restaurant",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/78/c4/ec/20181025-192030-largejpg.jpg?w=1200&h=1200&s=1",
    description: "TCamalig Restaurant in Angeles City is a heritage dining destination housed in a restored 1840s rice granary, celebrated for its signature Armando’s Pizza—a Kapampangan-style thin-crust pizza topped with local and international flavors. Founded in 1980 by historian Marc Nepomuceno, the restaurant preserves the rustic charm of Spanish-era architecture while offering a unique fusion of tradition and innovation. It’s a cornerstone of Pampanga’s culinary tourism, often featured in food tours and cultural itineraries.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 123 5678",
    email: "info@camaligrestaurant.com",
    link: "https://www.camaligrestaurant.com/",
    mapEmbed: "https://www.google.com/maps?q=Camalig+Restaurant+Angeles&output=embed"
  },
  {
    name: "Mila’s Tokwa’t Baboy",
    city: "Angeles City",
    image: "https://iorbitnews.com/wp-content/uploads/2023/01/img_3182.jpg",
    description: "Mila’s Tokwa’t Baboy is a beloved Filipino restaurant in Angeles City, Pampanga, famous for its crispy tofu and pork belly dish, sizzling sisig, and authentic Kapampangan flavors served in a casual, no-frills setting. Established in 1986, it has grown into a culinary institution with multiple branches, drawing locals and tourists alike for its hearty comfort food and consistent quality.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 234 5678",
    email: "info@milasrestaurant.com",
    link: "https://www.milasrestaurant.com/",
    mapEmbed: "https://www.google.com/maps?q=Mila's+Tokwa't+Baboy+Angeles&output=embed"
  },
  {
    name: "Bale Dutung",
    city: "Angeles City",
    image: "https://media-cdn.tripadvisor.com/media/photo-s/0b/97/67/11/kare-kare.jpg",
    description: "Set in a rustic and tropical ambiance, this Pampanga restaurant by Chef Claude Tayag offers traditional Kapampangan recipes, fusion meals, and degustation menus. Immerse in the experience by ordering the Kapampangan menu, which consists of Ensaladang Pako, Lechon Tortilla, Bulanglang Kapampangan, Kare Kareng Laman Dagat, and the local delicacy Tibok Tibok. This menu also has the Kapampangan Sushi, which is made of crab fat, fried catfish fillet, fermented shrimp, and Pindang Damulag. A Kapampangan Spread is also available and it includes Adobong Pugo, Pork Sisig, and Lingginita or Longganisang Guagua.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 12:00 PM - 9:00 PM",
    phone: "+63 917 345 6789",
    email: "info@baledutung.com",
    link: "https://www.baledutung.com/",
    mapEmbed: "https://www.google.com/maps?q=Bale+Dutung+Angeles&output=embed"
  },
  {
    name: "Matam-ih Kapampangan Cuisine",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/b2/a0/69/looking-for-authentic.jpg?w=900&h=500&s=1",
    description: "Matam-ih Restaurant in Clark Freeport Zone, Pampanga is a cultural dining destination known for its authentic Kapampangan cuisine and its unique practice of employing Aeta staff, who serve guests with warmth and pride. The name “Matam-ih” means “delicious” in the Aeta dialect, and the restaurant lives up to it with specialties like Sale Neytib Manok, Sinigang na Baboy, Chicken & Gizzard Barbecue, and Halo-halo. Its rustic interiors and heritage-inspired menu make it a favorite among locals, tourists, and food tour groups seeking a meaningful culinary experience.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 456 7890",
    email: "info@matamihkapampangan.com",
    link: "https://www.matamihkapampangan.com/",
    mapEmbed: "https://www.google.com/maps?q=Matam-ih+Kapampangan+Cuisine&output=embed"
  },
 {
    name: "25 Seeds",
    city: "Angeles City",
    image: "https://images.squarespace-cdn.com/content/v1/5fa1522044bdda192713063c/8cf8b948-8347-4347-8073-f032bbc5bb49/25+Seeds+by+Caf%C3%A9+Fleur",
    description: "If you’re exploring Angeles City and looking for an authentic yet elevated Kapampangan dining experience, 25 Seeds should be at the top of your list! This farm-to-table restaurant is owned by Chef Sau Del Rosario, a Kapampangan chef renowned for his culinary passion for preserving local flavors and bringing modern flair to timeless Kapampangan recipes. One of their bestsellers is Suam na Mais, a traditional corn soup made with fresh corn kernels, shrimp, and leafy greens.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 10:00 PM",
    phone: "+63 917 567 8901",
    email: "info@25seeds.com",
    link: "https://www.25seeds.com/",
    mapEmbed: "https://www.google.com/maps?q=25+Seeds+Angeles&output=embed"
  },
  {
    name: "Teresita Razon’s Halo-Halo and Palabok",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/products/5293591.jpg?width=%s",
    description: "Teresita Razon’s Halo-Halo and Palabok in Angeles City offers a nostalgic taste of classic Filipino desserts and noodle dishes, with recipes rooted in the original Razon family tradition. Known for its minimalist yet flavorful halo-halo—made with finely shaved ice, leche flan, sweetened banana, and macapuno—and its rich, savory palabok, the Angeles branches deliver quality and affordability in casual settings outside mall chains.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 8:00 PM",
    phone: "+63 917 678 9012",
    email: "info@teresitarazon.com",
    link: "https://www.teresitarazon.com/",
    mapEmbed: "https://www.google.com/maps?q=Teresita+Razon+Halo-Halo+Palabok&output=embed"
  },
  {
    name: "Barn Fitness Cafe",
    city: "Angeles City",
    image: "https://scontent.fcrk1-3.fna.fbcdn.net/v/t39.30808-6/503391462_1148312793731026_711610944569926196_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=106&ccb=1-7&_nc_sid=f727a1&_nc_eui2=AeH-5yAhakQVZVjRgezlCfIbhQSA7aXTb_6FBIDtpdNv_hOBAS25cEh5wUso0Oac4FkRX4kQOnpKF-LntWEjaKP7&_nc_ohc=9glKERXe72AQ7kNvwFH2QDS&_nc_oc=AdknczFpfemR8YoiIDEMw-7q9aayNFK1n00ANDpjPn_PBWpxeH25biknfwDFKBAsG_Q&_nc_zt=23&_nc_ht=scontent.fcrk1-3.fna&_nc_gid=KFaS3KbCnIr1OZIQwwN8xQ&oh=00_AfgrcCYb6R82XVZW40lDdQkxIAvKl4zZCRmgXoutd5--rg&oe=692A546B",
    description: "Barn Fitness Café in Angeles City is a cozy, health-conscious hangout that blends café culture with wellness vibes, offering comfort food, protein-packed meals, and signature drinks like immunity shots and smash burgers. Located along Fil-Am Friendship Highway near Mansfield Residences, it’s a favorite tambayan for locals seeking a relaxed atmosphere with fitness-inspired menu options and rustic interiors.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 7:00 AM - 9:00 PM",
    phone: "+63 917 789 0123",
    email: "info@barnfitnesscafe.com",
    link: "https://www.barnfitnesscafe.com/",
    mapEmbed: "https://www.google.com/maps?q=Barn+Fitness+Cafe+Angeles&output=embed"
  },
  {
    name: "Abe’s Farm",
    city: "Magalang, Pampanga",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/14/74/5b/84/some-of-the-dishes-they.jpg?w=1100&h=1100&s=1",
    description: "Abe’s Farm in Magalang, Pampanga is a tranquil country retreat offering traditional Filipino hospitality, heritage cuisine, and lush natural surroundings. Founded by the LJC Restaurant Group in honor of Emilio “Abe” Aguilar Cruz—a Kapampangan artist, writer, and patriot—the farm blends rustic charm with cultural depth. Its restaurant serves heirloom Kapampangan dishes like kare-kare, sisig, and binukadkad na pla-pla, while the property also features a spa, museum, and cozy accommodations in native-style huts.",
    address: "Magalang, Pampanga",
    hours: "Open Daily 9:00 AM - 9:00 PM",
    phone: "+63 917 890 1234",
    email: "info@abesfarm.com",
    link: "https://www.abesfarm.com/",
    mapEmbed: "https://www.google.com/maps?q=Abe's+Farm+Magalang&output=embed"
  },
  {
    name: "19 Copung Copung Grill",
    city: "Angeles City",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/0VRUVRbnRySYu8N_-iIOWg/348s.jpg",
    description: "19 Copung Copung Grill in Angeles City, Pampanga is a long-standing Filipino buffet restaurant known for its generous servings of classic dishes like kaldereta, adobo, grilled meats, and seafood, served in a rustic, open-air setting. Popular among locals and tourists alike, it has built a reputation for hearty meals and casual dining since its early days along MacArthur Highway. Though its exact founding year isn’t widely documented, it remains a staple in Pampanga’s food scene.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 901 2345",
    email: "info@19copungcopung.com",
    link: "https://www.19copungcopung.com/",
    mapEmbed: "https://www.google.com/maps?q=19+Copung+Copung+Grill+Angeles&output=embed"
  },
  {
    name: "Cafe Fleur",
    city: "Angeles City",
    image: "https://images.summitmedia-digital.com/spotph/images/2020/12/09/cafe-fleur-5-1607487377.jpg",
    description: "Café Fleur in Angeles City, Pampanga is a heritage restaurant by Chef Sau del Rosario, offering avant-garde Kapampangan cuisine in a restored ancestral home. Known for its deconstructed Filipino classics like tamales, kare-kare, and truffle balut, Café Fleur elevates traditional flavors with modern techniques. It opened in 2015 as part of Chef Sau’s mission to honor Pampanga’s culinary legacy while innovating its future.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 7:00 AM - 8:00 PM",
    phone: "+63 917 012 3456",
    email: "info@cafefleur.com",
    link: "https://www.cafefleur.com/",
    mapEmbed: "https://www.google.com/maps?q=Cafe+Fleur+Angeles&output=embed"
  },
  {
    name: "Apag Marangle",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/08/26/ea/42/apag-marangle.jpg?w=900&h=500&s=1",
    description: "Apag Marangle is a beloved Kapampangan restaurant founded by Chef Cherry Pasion-Tan, offering farm-to-table Filipino cuisine in a rustic, nature-inspired setting. Established around 2008, it began as a humble roadside eatery and grew into a regional favorite by celebrating heirloom recipes like betute, bulanglang, pork sisig, and kamaru. The name means “dining in the farm,” and the ambiance reflects this with bamboo huts, lush greenery, and a homey atmosphere that honors Pampanga’s culinary heritage.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 123 4567",
    email: "info@apagmarangle.com",
    link: "https://www.apagmarangle.com/",
    mapEmbed: "https://www.google.com/maps?q=Apag+Marangle+Angeles&output=embed"
  },
  {
    name: "Didi’s Pizza",
    city: "Angeles City",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/pSbvyz1khvSy1mBt7k7EzQ/348s.jpg",
    description: "Casual pizza place offering a variety of flavors and toppings.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 10:00 PM",
    phone: "+63 917 234 5678",
    email: "info@didispizza.com",
    link: "https://www.didispizza.com/",
    mapEmbed: "https://www.google.com/maps?q=Didi's+Pizza+Angeles&output=embed"
  },
  {
    name: "Angeles Fried Chicken",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/products/5956224.jpg?width=%s",
    description: "Angeles Fried Chicken (AFC) is a heritage family-owned restaurant in Angeles City, Pampanga, known for its signature fried chicken, Filipino-American comfort food, and decades-long legacy of flavor and hospitality. Established in the 1960s, AFC has become a local institution, serving generations with its crispy chicken, spaghetti, burgers, and rice meals in a cozy, retro-style setting. Its taste was perfected over years of feedback and tradition, earning it a loyal following across Pampanga",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 10:00 PM",
    phone: "+63 917 345 6789",
    email: "info@angelesfriedchicken.com",
    link: "https://www.angelesfriedchicken.com/",
    mapEmbed: "https://www.google.com/maps?q=Angeles+Fried+Chicken&output=embed"
  }, 
 {
    name: "Downtown Cafe",
    city: "Angeles City",
    image: "https://s3-media0.fl.yelpcdn.com/bphoto/SeuGlhZs0QdrdqNBpnMXcA/348s.jpg",
    description: "Downtown Café in Angeles City is a retro-themed Kapampangan restaurant by Chef Claude Tayag, offering elevated Filipino comfort food with Chinese influences in a 1950s-inspired setting. A spin-off of the private dining space Bale Dutung, Downtown Café opened to bring heritage cuisine to a wider audience, serving dishes like bagnetta, crispy duck, lechón, and halo-halo amid jukeboxes, black-and-white tiles, and vintage Coca-Cola memorabilia.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 7:00 AM - 9:00 PM",
    phone: "+63 917 456 7890",
    email: "info@downtowncafe.com",
    link: "https://www.downtowncafe.com/",
    mapEmbed: "https://www.google.com/maps?q=Downtown+Cafe+Angeles&output=embed"
  },
  {
    name: "My Lola Nor’s Meryendahan",
    city: "Angeles City",
    image: "https://metroclarkguide.com/wp-content/uploads/2022/06/LolaNors.jpg",
    description: "My Lola Nor’s Meryendahan is a beloved Kapampangan eatery offering traditional Filipino snacks and comfort food in a cozy, home-style setting. Originally established in Mabalacat, Pampanga, it has grown into a local favorite for dishes like palabok, goto, pancit, and merienda platters that evoke the warmth of a grandmother’s kitchen. The restaurant blends nostalgia with casual dining, and its expansion into San Fernando reflects its evolution from a humble meryendahan to a full-service family restaurant.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 8:00 AM - 8:00 PM",
    phone: "+63 917 567 8901",
    email: "info@mylolanor.com",
    link: "https://www.mylolanor.com/",
    mapEmbed: "https://www.google.com/maps?q=My+Lola+Nor's+Meryendahan&output=embed"
  },
  {
    name: "Usie’s Cuisine",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/46/ce/a3/susie-s-cuisine.jpg?w=500&h=-1&s=1",
    description: "Susie’s Cuisine is a heritage Kapampangan delicacy shop and restaurant in Angeles City, Pampanga, renowned since 1972 for its traditional Filipino kakanin, savory dishes, and pasalubong treats. It began as a humble home-based business and grew into a regional icon, offering specialties like pancit palabok, tibok-tibok, ensaymada, and sapin-sapin. With a reputation for quality and authenticity, Susie’s Cuisine has become a go-to destination for merienda, takeout, and festive food orders.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 678 9012",
    email: "info@usiescuisine.com",
    link: "https://www.usiescuisine.com/",
    mapEmbed: "https://www.google.com/maps?q=Usie's+Cuisine+Angeles&output=embed"
  },
  {
    name: "Funnside Ningnangan",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2d/97/c6/5e/caption.jpg?w=900&h=500&s=1",
    description: "Funnside Ningnangan in Angeles City is a popular Kapampangan-style grill restaurant offering a wide array of freshly grilled seafood, meats, and Filipino comfort dishes in a lively, open-air setting. Originating from a small catering business, it grew into one of Pampanga’s most talked-about dining spots by catering to local tastes and creating a festive, barkada-friendly atmosphere. Known for its inihaw na pusit, tilapia, liempo, and paluto-style service, it has become a go-to venue for birthdays, reunions, and casual feasts.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 9:00 PM",
    phone: "+63 917 789 0123",
    email: "info@funnside.com",
    link: "https://www.funnside.com/",
    mapEmbed: "https://www.google.com/maps?q=Funnside+Ningnangan&output=embed"
  },
  {
    name: "Kynd Dining",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/8d/e0/23/caption.jpg?w=900&h=500&s=1",
    description: "Kynd Dining is a scenic garden restaurant in Sapangbato, Angeles City, Pampanga, offering Filipino fusion cuisine in a tranquil, Bali-inspired setting. Opened in June 2023, it quickly gained popularity for its serene mountain views and inventive dishes like crispy pork kare-kare, okoy, and aligue fried rice. The ambiance evokes a peaceful retreat, making it ideal for relaxed dining, dates, and small gatherings.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 10:00 PM",
    phone: "+63 917 890 1234",
    email: "info@kynddining.com",
    link: "https://www.kynddining.com/",
    mapEmbed: "https://www.google.com/maps?q=Kynd+Dining+Angeles&output=embed"
  },
  {
    name: "Tito Boy",
    city: "Angeles City",
    image: "https://titoboys.com/wp-content/uploads/2022/12/Tito-Boy-_-Google-Image-_-16.png",
    description: "Tito Boy is an intimate 22-seater bistro in Angeles City, Pampanga, offering elevated comfort food crafted by Chef Bong Sagmit in a cozy, tavern-style setting. Opened in late 2023, the restaurant reflects Sagmit’s return to his hometown after years in Manila, where he honed his culinary skills. Tito Boy features a short, seasonal menu with dishes like beef belly kare-kare, pork belly with bagoong rice, and crispy chicken skin with aioli, served in a warmly lit space with sage walls, wood paneling, and a gallery of bird illustrations.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 901 2345",
    email: "info@titoboy.com",
    link: "https://www.titoboy.com/",
    mapEmbed: "https://www.google.com/maps?q=Tito+Boy+Angeles&output=embed"
  },
  {
    name: "Lu Cia’s Grill and Resto",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/39/11/46/mekeni-salangi-na-ka.jpg?w=500&h=-1&s=1",
    description: "Local grill restaurant serving Filipino favorites and grilled specialties.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 012 3456",
    email: "info@luciasgrill.com",
    link: "https://www.luciasgrill.com/",
    mapEmbed: "https://www.google.com/maps?q=Lu+Cia's+Grill+and+Resto&output=embed"
  },
  {
    name: "Otties Central Grill",
    city: "Angeles City",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEg89oCXxoRqrWCxhhkpN4peMTND1mNHMLQgRGQJxFztmgg6HdjAonlr9BmPbfF1TTJ5qCSshI8DBRXeo07zMY_vqOQm6pw5oWi88vEpWC7mf8-96zRtL4aeD0NrkG-XqPXdtuqMtp6BIPY/s1600/2014-01-20-3859.jpg",
    description: "Casual Filipino restaurant known for its grilled meats and local dishes.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 123 4567",
    email: "info@ottiesgrill.com",
    link: "https://www.ottiesgrill.com/",
    mapEmbed: "https://www.google.com/maps?q=Otties+Central+Grill+Angeles&output=embed"
  },
  {
    name: "Wishing Well",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/a2/6c/84/salmon-belly-sisig.jpg?w=1200&h=1200&s=1",
    description: "Restaurant and bar offering Filipino cuisine, cocktails, and casual dining experience.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 10:00 PM",
    phone: "+63 917 234 5678",
    email: "info@wishingwell.com",
    link: "https://www.wishingwell.com/",
    mapEmbed: "https://www.google.com/maps?q=Wishing+Well+Angeles&output=embed"
  }, 
{
    name: "Tugs Resto Bar",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/07/ec/fe/tugs-restobar.jpg?w=1200&h=1200&s=1",
    description: "Casual dining and bar serving Filipino and Asian fusion dishes with drinks.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 11:00 PM",
    phone: "+63 917 345 6789",
    email: "info@tugsrestobar.com",
    link: "https://www.tugsrestobar.com/",
    mapEmbed: "https://www.google.com/maps?q=Tugs+Resto+Bar+Angeles&output=embed"
  },
  {
    name: "Topchillog",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/amwg-listing.jpg",
    description: "Known for its hearty Filipino dishes and casual dining experience.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 456 7890",
    email: "info@topchillog.com",
    link: "https://www.topchillog.com/",
    mapEmbed: "https://www.google.com/maps?q=Topchillog+Angeles&output=embed"
  },
  {
    name: "Taldawa Kambingan Grill",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/19/5e/91/kambingan.jpg?w=1100&h=1100&s=1",
    description: "Taldawa Kambingan Grill in Angeles City is a humble, open-air eatery specializing in grilled goat dishes and Filipino comfort food, known for its authentic flavors and local charm. Set in a cement-walled compound with simple shelters and Ketapang trees, it offers a laid-back dining experience focused on kambing (goat) specialties like kaldereta, papaitan, and grilled kambing. Though its founding date isn’t widely documented, it has earned a loyal following for its no-frills, hearty meals",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 567 8901",
    email: "info@taldawakambingan.com",
    link: "https://www.taldawakambingan.com/",
    mapEmbed: "https://www.google.com/maps?q=Taldawa+Kambingan+Grill+Angeles&output=embed"
  },
  {
    name: "Gabita’s Crispy Pata and Crispy Ulo Station",
    city: "Angeles City",
    image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/2c/ba/75/84/caption.jpg",
    description: "Gabita’s Crispy Pata and Crispy Ulo Station in Angeles City is a local favorite for indulgent Filipino pork dishes, especially its namesake crispy pata and crispy ulo, served in a casual, open-air setting. Known for its flavorful, deep-fried specialties and generous portions, the restaurant offers a straightforward menu focused on comfort food and takeout-friendly meals. It opened in late 2022, quickly gaining traction among locals for its affordability and satisfying taste",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 10:00 PM",
    phone: "+63 917 678 9012",
    email: "info@gabitas.com",
    link: "https://www.gabitas.com/",
    mapEmbed: "https://www.google.com/maps?q=Gabita's+Crispy+Pata+Angeles&output=embed"
  },
  {
    name: "Racio’s Grill",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/n7mq-listing.jpg",
    description: "Local grill and resto offering classic Filipino dishes and grilled favorites.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 789 0123",
    email: "info@raciosgrill.com",
    link: "https://www.raciosgrill.com/",
    mapEmbed: "https://www.google.com/maps?q=Racio's+Grill+Angeles&output=embed"
  },
  {
    name: "Rustica Restaurant",
    city: "Angeles City",
    image: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjH4bZZPZrazNGdu43Mj_6TxH4MMGk1iEqylrCP_gLqa-vfxi6d40En8zdkDluwdXQd8zvTDxXxHWE_wip4DvuyfIFN9auyTCe8Fok0utFy-7xvW0jn4dciRrxF9KtQcn6ho3uZczfEpgo/s1600/Rustica-Restaurant-Menu.jpg",
    description: "Rustica Restaurant in Angeles City is a Filipino family-style dining spot known for its well-organized menu, generous portions, and flavorful local dishes like garlic rice, fried prawns, and seafood platters. Located along Fil-Am Friendship Highway in Cutcut, it has earned praise for its great service and cozy ambiance, making it a popular venue for birthday parties, lunch gatherings, and casual dinners. While its exact founding date isn’t widely documented, Rustica has built a strong reputation among locals and visitors alike.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 890 1234",
    email: "info@rusticarestaurant.com",
    link: "https://www.rusticarestaurant.com/",
    mapEmbed: "https://www.google.com/maps?q=Rustica+Restaurant+Angeles&output=embed"
  },
  {
    name: "Sisig Daily",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/69/29/24/this-is-our-menu-for.jpg?w=900&h=500&s=1",
    description: "Sisig Daily in Angeles City is a trending food cart-style eatery known for its crunchy pork sisig and flavorful Filipino street food, offering affordable meals that locals love to line up for. Located across Savers Mall in Balibago, it has gained popularity for its signature crispy sisig, lechon kawali, chicharon bulaklak, and adobong isaw. The brand emphasizes fast service, bold flavors, and a casual dining vibe that appeals to both barkada groups and solo diners.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 10:00 PM",
    phone: "+63 917 901 2345",
    email: "info@sisigdaily.com",
    link: "https://www.sisigdaily.com/",
    mapEmbed: "https://www.google.com/maps?q=Sisig+Daily+Angeles&output=embed"
  },
  {
    name: "Pizza Chipipie",
    city: "Angeles City",
    image: "https://scontent.fcrk1-1.fna.fbcdn.net/v/t39.30808-6/469181535_497525323333547_4093777171051764211_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=cc71e4&_nc_eui2=AeH4ffrYFf8WPJPj7pTV_MnyTvsZZTvqK7JO-xllO-orsiSpk_MpxRm5LHTojGpFuTz5ubxStCEVY7M34xO6GdRt&_nc_ohc=i8OgUOHthi0Q7kNvwFig76x&_nc_oc=Adn1cqzArOAK0CG8z2QGLRQ4VwcfEuKPYcBX9ecHQtvd3bw8NfbbGASLrLyEgscFm5U&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=NoD6l-1gPcLS2tG6bISXXQ&oh=00_AfhEzLWmyIgRsxjiyxFOC-cHoGXICclLXaGo-YU2UGOJQw&oe=692A2943",
    description: "Casual pizzeria offering a variety of pizza flavors and sides.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 10:00 PM",
    phone: "+63 917 012 3456",
    email: "info@pizzachipipie.com",
    link: "https://www.pizzachipipie.com/",
    mapEmbed: "https://www.google.com/maps?q=Pizza+Chipipie+Angeles&output=embed"
  },
  {
    name: "Evo’s Tapsi House",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/vjvu-hero.jpg?width=480&height=360&quality=45",
    description: "Evo’s Tapsi House in Angeles City is a 24/7 Filipino eatery known for its affordable silog meals, catering services, and fast delivery, offering comfort food like tapsilog, lechonsilog, and bangussilog in a no-frills, barkada-friendly setting. Located along Abacan Road in Barangay Malabanias, it has built a loyal following for its generous portions and reliable service. Evo’s also provides official BIR receipts and crew meals for bulk orders, making it a favorite among local businesses and night-shift workers.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 7:00 AM - 9:00 PM",
    phone: "+63 917 123 4567",
    email: "info@evostapsi.com",
    link: "https://www.evostapsi.com/",
    mapEmbed: "https://www.google.com/maps?q=Evo's+Tapsi+House+Angeles&output=embed"
  },
{
    name: "Esting’s Bellychon",
    city: "Angeles City",
    image: "https://assets1.phonebooky.com/listings/assets/000/044/851/original/321683059_2077806142417617_9218396628160121971_n.jpg",
    description: "Specializes in bellychon and other crispy pork dishes, a local favorite.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 234 5678",
    email: "info@estingsbellychon.com",
    link: "https://www.estingsbellychon.com/",
    mapEmbed: "https://www.google.com/maps?q=Esting's+Bellychon+Angeles&output=embed"
  },
  {
    name: "Wooden Table",
    city: "Angeles City",
    image: "https://media-cdn.tripadvisor.com/media/photo-m/1280/14/0e/0d/30/great-food.jpg",
    description: "Cozy restaurant offering a mix of Filipino and Western dishes in a relaxed ambiance.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 345 6789",
    email: "info@woodentable.com",
    link: "https://www.woodentable.com/",
    mapEmbed: "https://www.google.com/maps?q=Wooden+Table+Angeles&output=embed"
  },
  {
    name: "House of Chops",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/a5yv-listing.jpg",
    description: "Steakhouse and grill offering premium meats and Filipino specialties.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 10:00 PM",
    phone: "+63 917 456 7890",
    email: "info@houseofchops.com",
    link: "https://www.houseofchops.com/",
    mapEmbed: "https://www.google.com/maps?q=House+of+Chops+Angeles&output=embed"
  },
  {
    name: "Clark Lomi House",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/13/6f/88/58/the-best-lomi-ever.jpg?w=1100&h=-1&s=1",
    description: "Clark Lomi House in Angeles City (Mabalacat area) is a beloved Filipino eatery known for its rich, savory lomi noodle soup, seafood salads, and grilled dishes served in a cozy, family-style setting. Located at the corner of M.L. Quezon Avenue and C.M. Recto Avenue in Clark Field, it has earned a reputation for affordable prices, generous portions, and a comfortable atmosphere. While its founding date isn’t widely documented, it ranks among the top local restaurants and is praised for its competent staff and great coffee",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 9:00 AM - 9:00 PM",
    phone: "+63 917 567 8901",
    email: "info@clarklomihouse.com",
    link: "https://www.clarklomihouse.com/",
    mapEmbed: "https://www.google.com/maps?q=Clark+Lomi+House+Angeles&output=embed"
  },
  {
    name: "Ikabud",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/10/c8/75/29/20170920-191413-largejpg.jpg?w=1200&h=1200&s=1",
    description: "Casual restaurant known for seafood dishes and Filipino comfort food.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 678 9012",
    email: "info@ikabud.com",
    link: "https://www.ikabud.com/",
    mapEmbed: "https://www.google.com/maps?q=Ikabud+Angeles&output=embed"
  },
  {
    name: "Jun Jun’s Restaurant",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/LH/d93y-listing.jpg",
    description: "Traditional Filipino restaurant offering hearty local meals.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 789 0123",
    email: "info@junjunsrestaurant.com",
    link: "https://www.junjunsrestaurant.com/",
    mapEmbed: "https://www.google.com/maps?q=Jun+Jun's+Restaurant+Angeles&output=embed"
  },
  {
    name: "B&B Grill",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/15/11/23/3a/b-b-grill.jpg?w=1200&h=1200&s=1",
    description: "Casual grill restaurant serving Filipino barbecue and specialty dishes.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 890 1234",
    email: "info@bbgrill.com",
    link: "https://www.bbgrill.com/",
    mapEmbed: "https://www.google.com/maps?q=B%26B+Grill+Angeles&output=embed"
  },
  {
    name: "Cioccolo",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/16/80/05/5d/yummers.jpg?w=1200&h=-1&s=1",
    description: "Cioccolo Café in Angeles City is a boutique-style Italian restaurant offering gourmet comfort food like salmon steaks, chicken parmo, cheesecakes, and moccachino in a cozy, garden-inspired setting. Located in Royal Garden Estate along Friendship Circumferential Road, it’s known for its elegant interiors, friendly staff, and relaxing ambiance. Cioccolo has earned a Travelers’ Choice award and consistently ranks among the top cafés in the city for lunch and dinner.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 8:00 AM - 9:00 PM",
    phone: "+63 917 901 2345",
    email: "info@cioccolo.com",
    link: "https://www.cioccolo.com/",
    mapEmbed: "https://www.google.com/maps?q=Cioccolo+Angeles&output=embed"
  },
  {
    name: "Mayari Filipino Gastro Pub",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/26/0e/ff/19/another-favorite-the.jpg?w=900&h=500&s=1",
    description: "Modern gastro pub offering Filipino fusion dishes and drinks.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 11:00 PM",
    phone: "+63 917 012 3456",
    email: "info@mayarigastropub.com",
    link: "https://www.mayarigastropub.com/",
    mapEmbed: "https://www.google.com/maps?q=Mayari+Filipino+Gastro+Pub+Angeles&output=embed"
  },
  {
    name: "Balanghai Buffet",
    city: "Angeles City",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ0w5wJcgB73F9IqVhtphZ-DiPypVE0wSu_zA&s",
    description: "Buffet restaurant offering a wide selection of Filipino and Asian cuisine.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 10:00 PM",
    phone: "+63 917 123 4567",
    email: "info@balanghai.com",
    link: "https://www.balanghai.com/",
    mapEmbed: "https://www.google.com/maps?q=Balanghai+Buffet+Angeles&output=embed"
  },
  {
    name: "Abe Buffet Plus",
    city: "Angeles City",
    image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/486722750_695200052852934_50080315425329355_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHs5S4L_shEgwuKJXPKb65fXASvOU2St5VcBK85TZK3lbRkFL_NMzCQJ5aIlCoONbaRMXVY0TtoAkrZ4XOepqmR&_nc_ohc=4aX2FQQB-1wQ7kNvwFKvXWL&_nc_oc=AdmABky9EbRDSvIDS9-FMEA05mV5pDBAxOwthV0I5t7O629uFIGkJKBd-JpGTUKKRJw&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=10JHmqHzuNyUV833x-Pd-Q&oh=00_Afjo5flS_fNN5kIrgTOEUQQsjz4YJd3s2Y0nSvuz-jXQFQ&oe=692A48E2",
    description: "Buffet restaurant offering traditional Kapampangan dishes and local favorites.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 234 5678",
    email: "info@abebuffetplus.com",
    link: "https://www.abebuffetplus.com/",
    mapEmbed: "https://www.google.com/maps?q=Abe+Buffet+Plus+Angeles&output=embed"
  },
  {
    name: "Gabs Chicken and Grill",
    city: "Angeles City",
    image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/491202646_1122295453246424_650736209908885389_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFIg_1I806EKXiHCMnoP7bjQUg9iKceHJFBSD2Ipx4ckee0kwommWWo89WHgN1VlqZ1HDhn9uJHjESTDgFk15rT&_nc_ohc=qYsp6Fmc6_0Q7kNvwEf5qYR&_nc_oc=AdngksrS_xwj_uGRINE1uIrhDZrl4CahNiiTh5Af0eBG0ImOT-Hok7kXvqk-dlYY0c4&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=PotB3am6PA5jacBngTmolw&oh=00_AfgYtrgfyWqk8-j5rYyXmCCCWvjhQIo3cAkMqjmvbAo9AA&oe=692A45DF",
    description: "Gab’s Chicken Inasal in Angeles City is a Filipino barbecue eatery specializing in flavorful grilled chicken inasal, pork barbecue, and classic silog meals served in a casual, barkada-friendly setting. Located along Magalang Avenue and at The Infinity in Pulung Maragul, it has become a go-to spot for affordable grilled favorites and late-night cravings. While its founding date isn’t widely documented, Gab’s has built a loyal following with its signature marinade and approachable service.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 345 6789",
    email: "info@gabschicken.com",
    link: "https://www.gabschicken.com/",
    mapEmbed: "https://www.google.com/maps?q=Gabs+Chicken+and+Grill+Angeles&output=embed"
  },
  {
    name: "Altezza Restaurant",
    city: "Angeles City",
    image: "https://en.balagne-corsica.com/content/uploads/apidae/2021/12/11733829-770x616.jpg",
    description: "Modern restaurant offering Filipino and international cuisine in a stylish ambiance.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 11:00 AM - 10:00 PM",
    phone: "+63 917 456 7890",
    email: "info@altezza.com",
    link: "https://www.altezza.com/",
    mapEmbed: "https://www.google.com/maps?q=Altezza+Restaurant+Angeles&output=embed"
  },
  {
    name: "Lola Sisa Grill and Kambingan",
    city: "Angeles City",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/29/5d/5a/3e/caption.jpg?w=1200&h=1200&s=1",
    description: "Specializes in grilled meats, kambing dishes, and classic Filipino cuisine.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 567 8901",
    email: "info@lolasisa.com",
    link: "https://www.lolasisa.com/",
    mapEmbed: "https://www.google.com/maps?q=Lola+Sisa+Grill+and+Kambingan+Angeles&output=embed"
  },
  {
    name: "Bake Oven Cafe",
    city: "Angeles City",
    image: "https://images.deliveryhero.io/image/fd-ph/products/53634352.jpg?width=%s",
    description: "Bakery and cafe serving pastries, breads, and coffee for a casual experience.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 7:00 AM - 8:00 PM",
    phone: "+63 917 678 9012",
    email: "info@bakeovencafe.com",
    link: "https://www.bakeovencafe.com/",
    mapEmbed: "https://www.google.com/maps?q=Bake+Oven+Cafe+Angeles&output=embed"
  },
  {
    name: "Totobits",
    city: "Angeles City",
    image: "https://d2kihw5e8drjh5.cloudfront.net/eyJidWNrZXQiOiJ1dGEtaW1hZ2VzIiwia2V5IjoicGxhY2VfaW1nL3ZwUDFQWVBiUjkydWViU0VDeEl4VmciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjY0MCwiaGVpZ2h0Ijo2NDAsImZpdCI6Imluc2lkZSJ9LCJyb3RhdGUiOm51bGwsInRvRm9ybWF0IjogIndlYnAifX0=",
    description: "Totobits in Angeles City is a beloved street food destination offering a wide variety of Filipino favorites like isaw, betamax, kwek-kwek, bone marrow noodle soup, and puto bumbong, all served in a casual, open-air setting that celebrates Kapampangan street culture. The name “Totobits” comes from the Kapampangan phrase “Toto Bitis” (hanging feet), reflecting the relaxed, communal vibe where vendors and diners often perch with their feet dangling. Known for its affordability and authenticity, Totobits has become a go-to for locals and tourists seeking a true taste of Pampanga.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 789 0123",
    email: "info@totobits.com",
    link: "https://www.totobits.com/",
    mapEmbed: "https://www.google.com/maps?q=Totobits+Angeles&output=embed"
  },
  {
    name: "Cabalen",
    city: "Angeles City",
    image: "https://cabalengroup.ph/wp-content/uploads/2024/09/cabalen-1024x512.jpg",
    description: "Cabalen in Angeles City is part of a renowned Filipino buffet chain that began in Pampanga, offering authentic Kapampangan and Asian dishes like kare-kare, lechon, and dinuguan in an “Eat All You Can” format that celebrates Filipino culinary heritage. Known for its commitment to freshly cooked, beautifully presented food, Cabalen has grown into a national brand with over 66 branches across the Philippines. The Angeles City branch provides a warm, family-friendly dining experience ideal for celebrations and casual meals.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 890 1234",
    email: "info@cabalen.com",
    link: "https://www.cabalen.com/",
    mapEmbed: "https://www.google.com/maps?q=Cabalen+Angeles&output=embed"
  },
  {
    name: "Bariotik Buffet",
    city: "Angeles City",
    image: "https://whereinpampanga.com/wp-content/uploads/2022/08/274151896_121543023759470_1121603921697189653_n-1.jpg",
    description: "Bariotik Buffet in Angeles City is a barrio-style eat-all-you-can restaurant offering a wide array of traditional Kapampangan dishes like kare-kare, lechon kawali, kilayin, suwam mais, and ginataang kuhol, all served in a spacious, garden-inspired setting with affordable pricing and warm service. It’s designed to evoke the charm of rural Pampanga while delivering a feast of local flavors, making it a popular destination for family gatherings and food crawls.",
    address: "Angeles City, Pampanga",
    hours: "Open Daily 10:00 AM - 9:00 PM",
    phone: "+63 917 901 2345",
    email: "info@bariotikbuffet.com",
    link: "https://www.bariotikbuffet.com/",
    mapEmbed: "https://www.google.com/maps?q=Bariotik+Buffet+Angeles&output=embed"
  }
];

  // 4. LODGING (Updated with City Tags)
  const lodging = [
    { name: "AT THE PAD HOTEL", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max500/672943180.jpg?k=b3ac6437bec42368bc874c2f7651b7c5e141cedbeff3b76a195dcc41740e500b&o=&hp=1", description: "Affordable hotel with cafe and pool.",
     address: "Sarmiento St. Malabanias, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "0917-654-4579 / 0917-705-0526",
  email: "atthepadhotel@gmail.com",
 mapEmbed: "https://www.google.com/maps?q=AT+THE+PAD+HOTEL+AND+RESORT+Angeles&output=embed" },
    
    { name: "FRIENDSHIP ON HOTEL", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/481478121.jpg?k=be2503824a264bc9fe7eb362d8ebd109f5fd0696e3d1bd0ff2af7a8aaa708ab2&o=", description: " Our hotel offers the perfect blend of comfort, convenience, and relaxation. Whether you’re traveling solo, with family, or for work, we’ve got the right room for you.",
 address: "11 and 12 Yantze Street, Barangay Anunas, Angeles City, Pampanga, Philippines",
  hours: "Open Daily 24 Hours",
  phone: "09073424253",
  email: " onhotelfriendhip.wink@gmail.com",
 mapEmbed: "https://www.google.com/maps?q=Friendship+On+Hotel+Angeles&output=embed" },
    { name: "HOTEL SNOW", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/236339262.jpg?k=04e7382f5960abdf8cdf083835018e82a8aa3da33b775103c8ea4b1630c03685&o=", description: "The first shipping container hotel in Pampanga that offers a unique cozy vibe accommodation, relaxation.",
address: "15-13 Angara St. Brgy. Anunas, Korean Twn Angeles City",
  phone: " 0960-845-6944",
link: "https://sites.google.com/view/hotelsnow",
mapEmbed: "https://www.google.com/maps?q=Hotel+Snow+Angeles&output=embed" },
    { name: "Kandi Palace", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/271207155.jpg?k=3e03a6774ef99a4c0ad3d943da88eaad537f4665f512481144b43b7872c7b5ac&o=", description: "Kandi Palace is the highly popular luxurious condo resort from Kandi Realty in Angeles City.",
address: "Narciso Avenue, Josefa Subdivision, Angeles City, Pampanga, Philippines",
  hours: "Open Daily 24 Hours",
  phone: " 0939-905-4898",
  email: "reservation@kandireality.com",
  // 👇 ADD THE WEBSITE LINK HERE
  link: "http://Kandireality.com"
 ,mapEmbed: "https://www.google.com/maps?q=Kandi+Palace+Angeles&output=embed" },
    { name: "HOTEL CLARKTON", city:"Angeles City", image: "https://pix10.agoda.net/hotelImages/2424735/-1/5f2959c048e493b047de29ebeeb73a06.jpg?ca=19&ce=1&s=414x232", description: "Stay, dine, and unwind.",
address: "630 Don Juico Ave, Angeles City 2009",
  phone: "0915-455-1155",
  email: "info@clarkton-hotel.com",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://clarkton-hotel.com/", mapEmbed: "https://www.google.com/maps?q=Clarkton+Hotel+Angeles&output=embed" },
    { name: "RED PLANET HOTELS", city:"Angeles City", image: "https://cdn.redplanethotels.com/photos/hotel-hero/ang.jpg", description: "Value hotels in prime spots.",
address: " Don Juico Avenue, Malabanias, Angeles City, Pampanga, 2009, Philippines",
  hours: "Open Daily 24 Hours",
  phone: "85190888",
  email: "philippines@redplanethotels.com",
     
link: "redplanetph",
     
link: "https://www.facebook.com/atthepadhotel",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://www.redplanethotels.com/", mapEmbed: "https://www.google.com/maps?q=Red+Planet+Angeles&output=embed" },
    { name: "HOTEL D-CORONA", city:"Angeles City", image: "https://content.r9cdn.net/rimg/himg/51/34/e2/ostrovok-333672-3ff488-902976.jpg?crop=true&width=500&height=350", description: "24 hrs Open Drive In hotel.",
address: "Fil-Am Friendship Highway. Near Brgy. Cuayan, Stop light Mcdonald’s, along Korean Town, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "0917-698-1004",
  // 👇 ADD THE WEBSITE LINK HERE
  mapEmbed: "https://www.google.com/maps?q=Hotel+Corona+Angeles&output=embed" },
    { name: "HALLA HOTEL", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max500/506201251.jpg?k=32f8faf059000c441e29b4ccfb3308adaf219543825b0095695c04aa4380f9e5&o=&hp=1", description: "Provides Flawless Service and all the necessary facilities for visitors. Stay connected with your associates, as complimentary WI-FI is available during your entire visit. When arriving by car, take advantage of the hotel’s convenient on-site parking facilities.", 
address: "Volga St. Friendship, Angeles City 2009 Anunas, Angeles City, Philippines",
  phone: "0919-098-0954",
  email: "hallahotel2022@gmail.com",mapEmbed: "https://www.google.com/maps?q=Halla+Hotel+Angeles&output=embed" },
    { name: "Widus Hotel Clark", city:"Clark", image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/43439418.jpg?k=f7f8adeb99669b8083b75618d7ff1450e18471bed11b52dfbc494e23ff251081&o=", description: "It’s a premier leisure and business destination offering upscale accommodations, a casino, spa, and dining options.", 
address: "5399 Manuel A. Roxas Highway, Clark Freeport Zone, Angeles City, Pampanga, Philippines",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 499 1000",
  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://www.widus.com/",mapEmbed: "https://www.google.com/maps?q=Widus+Hotel+Clark&output=embed" },
    { name: "Devera Hotel", city:"Angeles City", image: "https://deverahotel.com/wp-content/uploads/2022/10/900-Devera-Hotel-5.jpg", description: "It offers modern, budget-friendly accommodations near SM City Clark and Walking Street, ideal for both leisure and business travelers.", 
address: "406 Don Juico Avenue, Malabanias, Angeles City, Pampanga, Philippines",
  hours: "Open Daily 24 Hours",
  phone: "0928-505-0441",
  email: "info@deverahotel.com",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://deverahotel.com/",mapEmbed: "https://www.google.com/maps?q=Devera+Hotel+Angeles&output=embed" },
    { name: "The Clover Hotel", city:"Angeles City", image: "https://cf.bstatic.com/xdata/images/hotel/max500/712597067.jpg?k=a887924d7c41253fd9119ab2fd46534830e3133990fc0a49d338724d4acb13f2&o=&hp=1", description: "3-star hotel with city views.",
     address: "LA' Hermoza Royal Wellness Salon and Spa",
  hours: "Open Daily 24 Hours",
  phone: "0962 236 9928",
  email: "thecloverhotel2024@gmail.com.",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://www.google.com/aclk?sa=L&pf=1&ai=DChsSEwjo5fDwpoaRAxVpYA8CHRaYHUEYACICCAEQABoCdGI&co=1&ase=2&gclid=CjwKCAiA24XJBhBXEiwAXElO3wcfp-QsfqgCsXq78_vWLTJAuaTfvI1ARbrcHpq7_XJ--JUCjZZNTRoCmq8QAvD_BwE&cid=CAAS3QHkaJXNzEq60icq1uqK50wIx3tp3raqcCBGo9pAiw7-fMAMXSlKKI1op86SCuJ0bmYhmXH_msns-2IldnGbh1fU444c3GAOzO4RMfgSDYe0Iw107Jfn0QFpDlz_zXHr9aScpBREcBgQor3rLj2EIUyTt3rRe2u363A1yk9Bob5JnfLtkH4BsmSxreE-WgbHrr0Mk1iEHfSjo_PQ_M2BG8SQ5fwnGcxh8vePL5sO8cbfwoaqmwztpw90-VFG7KtXu8qlh8-31272ybHDbvod8PIiU7d7_6UHHSv6z-7reQ&cce=2&category=acrcp_v1_32&sig=AOD64_0Tv_oFPojB8ELFEf519aE-t0nssA&q&nis=4&adurl=https://www.booking.com/hotel/ph/the-clover-angeles-city1.en-gb.html?aid%3D311984;label%3Dthe-clover-angeles-city1-gVPbsICZ7uhg9q3b9EqmIwS697392863475:pl:ta:p1:p2:ac:ap:neg:fi:tikwd-2301727086411:lp1011179:li:dec:dm:ppccp%3DUmFuZG9tSVYkc2RlIyh9YbSsBl3MCvHsD8UKUHIRFxY;ws%3D%26gad_source%3D1%26gad_campaignid%3D211315332%26gbraid%3D0AAAAAD_Ls1KHrvWGgwmAK31NNv85X2ZvX%26gclid%3DCjwKCAiA24XJBhBXEiwAXElO3wcfp-QsfqgCsXq78_vWLTJAuaTfvI1ARbrcHpq7_XJ--JUCjZZNTRoCmq8QAvD_BwE&ved=2ahUKEwj_0-rwpoaRAxXGsVYBHU1AGHcQ0Qx6BAgyEAE",
 mapEmbed: "https://www.google.com/maps?q=Clover+Hotel+Angeles&output=embed" },
    { name: "Hevea Hotel", city:"Angeles City", image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2b/91/55/a2/caption.jpg?w=1200&h=1200&s=1", description: "It’s a 4-star property offering modern amenities, a pool, and proximity to Clark’s attractions—ideal for leisure and business travelers alike.", 
address: "Furniture Village, Fil-Am Friendship Highway, Angeles City, Pampanga, Philippines 2009",
  hours: "Open Daily 24 Hours",
  phone: "0927 596 8282",
  email: "sm.hevea.hotel@gmail.com",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://heveaand-resort.angeles-city-hotel.com/en/",mapEmbed: "https://www.google.com/maps?q=Hevea+Hotel+Angeles&output=embed" },
    { name: "Hotel Euroasia", city:"Angeles City", image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/374903446.jpg?k=8c0d1fa1c4604e3371a8ee8ee95a68ce69f804b1d50f77b6ea741d53f0d07e31&o=", description: "It’s a 3-star hotel offering affordable accommodations with a pool, restaurant, and function halls—ideal for leisure stays and events.",
address: "Don Juico Avenue, Malabanias, Angeles City, Pampanga, Philippines",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 137 1192",
  email: "reserevations@bluebookers.com.ph",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://www.hoteleuroasiapampanga.com/en/", mapEmbed: "https://www.google.com/maps?q=Hotel+Euroasia+Angeles&output=embed" },
    { name: "Prime Asia Hotel", city:"Angeles City", image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/22866909.jpg?k=816195a6e6034fdaa38457ff79642239e94019c7d3d6ade4a87989ac21b08362&o=", description: "Modern, pet-friendly hotel.", 
address: "Sarmiento St. Malabanias, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 407 4670",
  email: "reserevations@bluebookers.com.ph",

  // 👇 ADD THE WEBSITE LINK HERE
  link: "https://www.facebook.com/atthepadhotel",mapEmbed: "https://www.google.com/maps?q=Prime+Asia+Hotel+Angeles&output=embed" },
   {
  name: "Rossa Hotel",
  city: "Angeles City",
  image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/750509494.jpg?k=947f1efb1a2a303df52ecfc3e1833ce04d42a5e11761cb17ad3fc26afebd3edc&o=",
  description: "A clean, comfortable, and modern hotel located in Angeles City.",
  address: "Malabanias Road, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 123 4567",
  email: "info@rossahotel.com",
  
  // 👇 ADD THE WEBSITE LINK & MAP HERE
  link: "https://www.booking.com/hotel/ph/rossa.en.html",
  mapEmbed: "https://www.google.com/maps?q=Rossa+Hotel+Angeles+City&output=embed"
},
{
  name: "Oasis Hotel",
  city: "Angeles City",
  image: "https://content.r9cdn.net/rimg/kimg/fc/ef/3bd17c804174d665.jpg?width=1366&height=768&crop=true",
  description: "A peaceful and well-known hotel featuring garden views and relaxing vibes.",
  address: "Clark Perimeter Road, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 322 3305",
  email: "info@oasishotel.com.ph",

  // 👇 LINKS
  link: "https://oasishotel.com.ph/",
  mapEmbed: "https://www.google.com/maps?q=Oasis+Hotel+Angeles+City&output=embed"
}, 
{
  name: "ABC Hotel",
  city: "Angeles City",
  image: "https://pix10.agoda.net/hotelImages/90091/-1/4b040c324daebc393395a3b9bcd8d37d.jpg?ce=0&s=414x232",
  description: "Luxury lifestyle hotel with modern rooms and high-end amenities.",
  address: "Don Juico Ave, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 892 2222",
  email: "info@angelesbeachclubhotel.com",
  link: "https://angelesbeachclubhotel.com/",
  mapEmbed: "https://www.google.com/maps?q=ABC+Hotel+Angeles+City&output=embed"
},
{
  name: "Royce Hotel and Casino",
  city: "Clark Freeport Zone",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0c/3d/57/ac/royce-hotel-casino.jpg?w=500&h=-1&s=1",
  description: "Modern hotel with casino, dining, and premium accommodations.",
  address: "Royce Hotel, Clark Freeport Zone, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 499 7888",
  email: "info@roycehotelcasino.com",
  link: "https://roycehotelcasino.com/",
  mapEmbed: "https://www.google.com/maps?q=Royce+Hotel+and+Casino+Clark&output=embed"
}, 
{
  name: "Clark Marriott Hotel",
  city: "Clark Freeport Zone",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/66/dd/37/exterior.jpg?w=900&h=500&s=1",
  description: "5-star luxury hotel offering premium rooms, dining, and amenities.",
  address: "5400 Manuel A. Roxas Hwy, Clark Freeport Zone, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 598 5000",
  email: "info@clarkmarriott.com",
  link: "https://www.marriott.com/en-us/hotels/crkmc-clark-marriott-hotel/",
  mapEmbed: "https://www.google.com/maps?q=Clark+Marriott+Hotel&output=embed"
}, 
{
  name: "JW Apartments",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/416696343.jpg?k=f5a7afd96290d100b41e644de1b8799306fdf20790ef9ffc7291d2b59defecd0&o=",
  description: "Affordable apartment-style stay with spacious units.",
  address: "Malabanias, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 123 4567",
  email: "info@jwapartments.com",
  link: "https://www.booking.com/hotel/ph/jw-apartments.en.html",
  mapEmbed: "https://www.google.com/maps?q=JW+Apartments+Angeles+City&output=embed"
},
{
  name: "D’Heights Clark Condo",
  city: "Clark Freeport Zone",
  image: "https://pix10.agoda.net/hotelImages/35962848/0/73b1edc1ef7160f038b630827f5bf0dc.jpg?ce=0&s=414x232",
  description: "Condo-style property inside the luxurious D’Heights Resort.",
  address: "D’Heights Resort, Clark Freeport Zone, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 499 8000",
  email: "info@dheights.com",
  link: "https://www.booking.com/hotel/ph/dheights-condo.en.html",
  mapEmbed: "https://www.google.com/maps?q=D%27Heights+Clark&output=embed"
},
{
  name: "EV2 TownHouse Hotel",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/586397300.jpg?k=9325902687a1b35913374252885e6575a5b3a9554d264fcca5c0a7ac6302c046&o=",
  description: "Budget-friendly townhouse-style accommodations.",
  address: "Friendship Highway, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 555 1234",
  email: "ev2townhouse@gmail.com",
  link: "https://www.booking.com/hotel/ph/ev2-townhouse.en.html",
  mapEmbed: "https://www.google.com/maps?q=EV2+TownHouse+Hotel+Angeles&output=embed"
},
{
  name: "Apple Transient House",
  city: "Angeles City",
  image: "https://q-xx.bstatic.com/xdata/images/hotel/840x460/271035665.jpg?k=fe23b78e7eb68f3c207f63488dcc893f60d3935c61a4935a7579eb774f9517c7&o=",
  description: "Budget-friendly transient stay ideal for short visits.",
  address: "Balibago, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 654 3210",
  email: "appletransient@gmail.com",
  link: "https://www.booking.com/hotel/ph/apple-transient-house.en.html",
  mapEmbed: "https://www.google.com/maps?q=Apple+Transient+House+Angeles&output=embed"
},
{
  name: "La Grande Residence",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/694769387.jpg?k=3fe959200ac1214ac448b1758bf117485c911d67e1effacfb0527f0f8831dcc0&o=",
  description: "Modern residence offering apartment-style units for travelers.",
  address: "Malabanias, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 995 842 3321",
  email: "lagranderesidence@gmail.com",
  link: "https://www.booking.com/hotel/ph/la-grande-residence.en.html",
  mapEmbed: "https://www.google.com/maps?q=La+Grande+Residence+Angeles&output=embed"
},
{
  name: "Casa De Una",
  city: "Angeles City",
  image: "https://wigotel.com/wp-content/uploads/2025/11/Casa-de-Una-Angeles-Clark-Philippines.jpg",
  description: "Comfortable home-like stay for families and groups.",
  address: "Friendship Highway, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 123 8899",
  email: "casadeuna@gmail.com",
  link: "https://www.booking.com/hotel/ph/casa-de-una.en.html",
  mapEmbed: "https://www.google.com/maps?q=Casa+De+Una+Angeles&output=embed"
},
{
  name: "MisyEdz Suites",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max500/634484476.jpg?k=d9c1c194c2e0b00e2096b38bf51030458026b29a411e7d6f6dadf0afb5435cde&o=&hp=1",
  description: "Affordable, clean, and modern suite-style rooms.",
  address: "Pandan, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 668 7721",
  email: "misyedzsuites@gmail.com",
  link: "https://www.booking.com/hotel/ph/misyedz-suites.en.html",
  mapEmbed: "https://www.google.com/maps?q=MisyEdz+Suites+Angeles&output=embed"
},
{
  name: "Sunny Villa",
  city: "Angeles City",
  image: "https://q-xx.bstatic.com/xdata/images/hotel/max500/674978570.jpg?k=90276d9a43f465bff8ec1fb54f4257db213eb0e1af90bab04c38477f6f3d460f&o=",
  description: "Private villa stay ideal for families and group travelers.",
  address: "Friendship, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 345 8890",
  email: "sunnyvilla@gmail.com",
  link: "https://www.booking.com/hotel/ph/sunny-villa.en.html",
  mapEmbed: "https://www.google.com/maps?q=Sunny+Villa+Angeles&output=embed"
},
{
  name: "Jays Villa A",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/537758064.jpg?k=7dd60304a8ba351140bc9f33bc2382b31a7f228579b3b2252afb7e1dc73e709c&o=",
  description: "Private villa with spacious rooms and modern interiors.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 881 2210",
  email: "jaysvilla@gmail.com",
  link: "https://www.booking.com/hotel/ph/jays-villa-a.en.html",
  mapEmbed: "https://www.google.com/maps?q=Jays+Villa+A+Angeles&output=embed"
},
{
  name: "Mscapes Cabin",
  city: "Angeles City",
  image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/559370553_122106293313039483_3612277188576010147_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeEZu9e87g-JrVoQjhNJkwoA-E2F0KchbZ_4TYXQpyFtn2o9OhBjpJHYmBx9-dyOqMLlA6jQuAgrND6ZaKDE6Z5W&_nc_ohc=pxTs1MkWP3IQ7kNvwGhagns&_nc_oc=AdlvdpAkwzs5WvDC5ia87yZ6MOREiaaAFn0vKjIh7wqoDt6G0MVmj1s7iDz0yhczxJA&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=bfX0_ttWTiTNnuOsLISE9Q&oh=00_Afjb8vKmlHgsVWQUzQROTAdc8s1BSy1K7WVv88vshwh_Ew&oe=692A37F7",
  description: "Cozy cabin-style accommodation perfect for relaxing stays.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 999 8822",
  email: "mscapescabin@gmail.com",
  link: "https://www.booking.com/hotel/ph/mscapes-cabin.en.html",
  mapEmbed: "https://www.google.com/maps?q=Mscapes+Cabin+Angeles&output=embed"
},
{
  name: "Savannah Resort Hotel",
  city: "Angeles City",
  image: "https://images.trvl-media.com/lodging/11000000/10640000/10630200/10630156/88688bbd.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  description: "Upscale hotel with stylish rooms, pool, and excellent amenities.",
  address: "Don Juico Ave, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 458 7777",
  email: "info@savannahresort.com",
  link: "https://www.savannahresort.com/",
  mapEmbed: "https://www.google.com/maps?q=Savannah+Resort+Hotel+Angeles&output=embed"
},
{
  name: "Casa La Carmela",
  city: "Angeles City",
  image: "https://staycations.ph/wp-content/uploads/2024/07/451353351_453508524271973_7556473536651451047_n.jpg",
  description: "Charming home-style stay with spacious rooms.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 723 8854",
  email: "casalacarmela@gmail.com",
  link: "https://www.booking.com/hotel/ph/casa-la-carmela.en.html",
  mapEmbed: "https://www.google.com/maps?q=Casa+La+Carmela+Angeles&output=embed"
},
{
  name: "Maganda Hotel",
  city: "Angeles City",
  image: "https://pix10.agoda.net/hotelImages/30992000/0/6638841be6b1349e86eb23bfbb119f38.jpg?ca=28&ce=0&s=1024x768",
  description: "A modern hotel offering comfortable rooms at affordable prices.",
  address: "Balibago, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 845 9980",
  email: "magandahotel@gmail.com",
  link: "https://www.booking.com/hotel/ph/maganda.en.html",
  mapEmbed: "https://www.google.com/maps?q=Maganda+Hotel+Angeles&output=embed"
},
{
  name: "Altezza Cabins",
  city: "Angeles City",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2e/bb/57/63/caption.jpg?w=900&h=500&s=1",
  description: "Modern cabin-style stays with elegant and cozy interiors.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 112 8899",
  email: "altezzacabins@gmail.com",
  link: "https://www.booking.com/hotel/ph/altezza-cabins.en.html",
  mapEmbed: "https://www.google.com/maps?q=Altezza+Cabins+Angeles&output=embed"
},
{
  name: "SK Condotel",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/650039852.jpg?k=912a76a4b37efd689767d093be4ead5b118a36d96df1def170d84189b761a07b&o=",
  description: "Convenient condotel offering modern rooms and amenities.",
  address: "Don Juico Ave, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 625 7788",
  email: "skcondotel@gmail.com",
  link: "https://www.booking.com/hotel/ph/sk-condotel.en.html",
  mapEmbed: "https://www.google.com/maps?q=SK+Condotel+Angeles&output=embed"
},
{
  name: "RM Deca Clark",
  city: "Angeles City",
  image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t39.30808-6/481677962_122221172708189771_715209522450908845_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFMBeOn4mzper5ov65QBpoc_12CcDsh_Mb_XYJwOyH8xvR_5GAsTZcdYmTdkRZ2Pyc_NOrXlSdzBlXPQkG15cKk&_nc_ohc=_1zhKZqytG8Q7kNvwEulbil&_nc_oc=Adms6Az_UyO7278Fhtjie7KLAFxFUgrGBFvZEMaJLE7WwKC6nfvCfOFTs2FLqi7uYJI&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=tInKJULwDob3KlZ6S3ftGg&oh=00_AfiPqjcqu7caFaE1K5CHtvGG0knPY3IK3HKJAw0lTEijeA&oe=692A27B0",
  description: "Affordable and clean apartment-style stay near Clark.",
  address: "Deca Clark, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 927 883 2211",
  email: "rmdecaclark@gmail.com",
  link: "https://www.booking.com/hotel/ph/rm-deca-clark.en.html",
  mapEmbed: "https://www.google.com/maps?q=RM+Deca+Clark+Angeles&output=embed"
},
{
  name: "Hotel Valentine",
  city: "Angeles City",
  image:"https://cf.bstatic.com/xdata/images/hotel/max1024x768/702115756.jpg?k=3bb63ca8a1acf7a5416f0939f1bddc6740eb27cfb48e50238d90e6abfd4fee28&o=",
  description: "Stylish hotel offering modern rooms and relaxing ambience.",
  address: "Balibago, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 888 1122",
  email: "valentinehotel@gmail.com",
  link: "https://www.booking.com/hotel/ph/valentine.en.html",
  mapEmbed: "https://www.google.com/maps?q=Hotel+Valentine+Angeles&output=embed"
},
{
  name: "Elyseah Condotel",
  city: "Angeles City",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/80/40/f3/oyo-123-elyseah-condotel.jpg?w=500&h=-1&s=1",
  description: "Modern condotel offering comfortable units in a central location.",
  address: "Don Juico Ave, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 625 7888",
  email: "elyseahcondotel@gmail.com",
  link: "https://www.booking.com/hotel/ph/elyseah-condotel.en.html",
  mapEmbed: "https://www.google.com/maps?q=Elyseah+Condotel+Angeles&output=embed"
},
{
  name: "Alap Apartment",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/579028802.jpg?k=0e701f37a8b97118dd0f9ef7e659c4e64c0540e31a5c5abf0f33f451467b7045&o=",
  description: "Simple and affordable apartment units for long and short stays.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 887 2240",
  email: "alapapartment@gmail.com",
  link: "https://www.booking.com/hotel/ph/alap-apartment.en.html",
  mapEmbed: "https://www.google.com/maps?q=Alap+Apartment+Angeles&output=embed"
},
{
  name: "RR Transient",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/603448724.jpg?k=24ca2d0544125fc91899eec372b9a73d6c183bbe0b307641a879d5d6949b8e84&o=",
  description: "Budget-friendly transient lodging ideal for short stays.",
  address: "Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 917 220 6621",
  email: "rrtransient@gmail.com",
  link: "https://www.booking.com/hotel/ph/rr-transient.en.html",
  mapEmbed: "https://www.google.com/maps?q=RR+Transient+Angeles&output=embed"
},
{
  name: "950 Condotel",
  city: "Angeles City",
  image: "https://s3-cdn.hotellinksolutions.com/hls/data/1709/website/general/bn/normal_condo-slider-01.jpg",
  description: "Popular condotel located next to Saver’s Mall with great accessibility.",
  address: "950 Fields Ave, Balibago, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 625 6590",
  email: "info@950condotel.com",
  link: "https://www.950condotel.com/",
  mapEmbed: "https://www.google.com/maps?q=950+Condotel+Angeles&output=embed"
},
{
  name: "Wild Orchid Resort",
  city: "Angeles City",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/58/ef/62/pool--v10136043.jpg?w=900&h=500&s=1",
  description: "Well-known resort with pools, dining, and spacious rooms.",
  address: "A. Santos Street, Balibago, Angeles City, Pampanga",
  hours: "Open Daily 24 Hours",
  phone: "+63 45 625 3950",
  email: "info@wildorchidresort.com",
  link: "https://www.wildorchidresort.com/",
  mapEmbed: "https://www.google.com/maps?q=Wild+Orchid+Resort+Angeles&output=embed"
},
{
  name: "Hotel Sogo Dau – Angeles City",
  city: "Angeles City",
  image: "https://images.trvl-media.com/lodging/6000000/5950000/5946400/5946309/06c7d4e0.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
  description: "Affordable hotel with 24/7 service.",
  address: "MacArthur Highway, Dau, Mabalacat, Pampanga",
  hours: "Open 24 Hours",
  phone: "+63 2 8893 3333",
  email: "customerservice@hotelsogo.com",
  link: "https://www.hotelsogo.com/",
  mapEmbed: "https://www.google.com/maps?q=Hotel+Sogo+Dau+Angeles&output=embed"
},

{
  name: "Tiger Hotel",
  city: "Angeles City",
  image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/69/48/06/tiger.jpg?w=700&h=400&s=1",
  description: "Modern hotel located in Fields Avenue.",
  address: "Fields Ave., Balibago, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 892 1688",
  email: "tigerhotelangeles@gmail.com",
  link: "http://www.tigerhotel.ph/",
  mapEmbed: "https://www.google.com/maps?q=Tiger+Hotel+Angeles&output=embed"
},

{
  name: "Swiss Chalet",
  city: "Angeles City",
  image: "https://pix10.agoda.net/hotelImages/621/621440/621440_14050912010019357868.jpg?ca=2&ce=1&s=414x232",
  description: "Swiss-themed boutique hotel with a cozy restaurant.",
  address: "A. Santos St., Balibago, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 625 4176",
  email: "swisschaletph@gmail.com",
  link: "http://www.swisschaletph.com/",
  mapEmbed: "https://www.google.com/maps?q=Swiss+Chalet+Angeles&output=embed"
},

{
  name: "Ritz Hotel",
  city: "Angeles City",
  image: "https://pix10.agoda.net/property/983600/0/e10b6328a2df7e3e15da9b2aa1fe3495.jpeg?ce=0&s=414x232",
  description: "Comfortable hotel close to nightlife and shops.",
  address: "A. Santos St., Balibago, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 892 0388",
  email: "ritzangeles@gmail.com",
  link: "https://www.ritzangeles.com/",
  mapEmbed: "https://www.google.com/maps?q=Ritz+Hotel+Angeles&output=embed"
},

{
  name: "KLM Condotel",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/489683206.jpg?k=7246255b5acf03d0bd1ea0245dce08b527b24796d873300a6913ee508c2a97be&o=",
  description: "Simple and budget-friendly condotel.",
  address: "Malabanias, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 626 1721",
  email: "klmcondotel@gmail.com",
  link: "https://www.facebook.com/KLMCondotel/",
  mapEmbed: "https://www.google.com/maps?q=KLM+Condotel+Angeles&output=embed"
},

{
  name: "Azzurro Hotel",
  city: "Angeles City",
  image: "https://media-cdn.tripadvisor.com/media/photo-p/12/30/e4/35/azzurro-hotel.jpg",
  description: "Elegant hotel with rooftop amenities.",
  address: "369 Don Juico Ave, Malabanias, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 499 3333",
  email: "info@azzurrohotel.com",
  link: "https://www.azzurrohotel.com/",
  mapEmbed: "https://www.google.com/maps?q=Azzurro+Hotel+Angeles&output=embed"
},

{
  name: "Maharajah Hotel",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/231746420.jpg?k=28f7c79398c4f488d48f90f6f36340e119e8f0ccf635445c50e80d31e4a43018&o=",
  description: "Classic hotel with pool and garden area.",
  address: "Don Juico Ave, Malabanias, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 892 3822",
  email: "maharajahhotelph@gmail.com",
  link: "https://www.facebook.com/maharajahhotel/",
  mapEmbed: "https://www.google.com/maps?q=Maharajah+Hotel+Angeles&output=embed"
},

{
  name: "Reca Resort",
  city: "Angeles City",
  image: "https://cf.bstatic.com/xdata/images/hotel/max1024x768/561264814.jpg?k=95e6ba0e86f37573b918380b7b52346db219488012e462ded25fe532820007b1&o=",
  description: "Quiet resort with pool and villas.",
  address: "Friendship Hwy, Angeles City",
  hours: "Open Daily",
  phone: "+63 45 625 1234",
  email: "recresort@gmail.com",
  link: "https://www.facebook.com/recresort/",
  mapEmbed: "https://www.google.com/maps?q=Reca+Resort+Angeles&output=embed"
},
];

  // 5. ROUTES
  // 5. ROUTES (Updated with City Tags for Filter)
  const routes = [
    { name: "Angeles → San Fernando", city: "Inter-City", image: "https://upload.wikimedia.org/wikipedia/commons/3/37/0673jfSanto_Domingo%2C_Angeles_City%2C_Pampanga_Jeep_Transport_Terminalfvf_27.jpg", description: "Links Dau Terminal to San Fernando Downtown.", mapEmbed: "https://www.google.com/maps?q=Angeles+City+to+San+Fernando+Pampanga&output=embed" },
    { name: "Main Gate → Friendship", city: "Angeles City", image: "https://c8.alamy.com/comp/2BP7JCA/classic-jeepneys-sat-at-the-main-bus-stop-in-angeles-city-luzon-philippines-2BP7JCA.jpg", description: "Color - Sand Terminal- ( Transport Hub ) Routes - Runs along Perimeter Road (Don Juico Avenue) from the Main Gate to Friendship Highway Fees - ( 13 - 20 Pesos ) ", mapEmbed: "https://www.google.com/maps?q=Main+Gate+to+Friendship+Angeles+City&output=embed" },
    { name: "Checkpoint → Balibago", city: "Angeles City", image: "https://c8.alamy.com/comp/2BP76G3/classic-jeepneys-sat-at-the-main-gate-bus-terminal-in-angeles-city-luzon-philippines-2BP76G3.jpg", description: "Main route for nightlife district.", mapEmbed: "https://www.google.com/maps?q=Checkpoint+to+Balibago+to+Highway+Angeles+City&output=embed" },
    { name: "SM City → Dau", city: "Mabalacat City", image: "https://c8.alamy.com/comp/2BP7B86/classic-jeepneys-sat-at-the-main-gate-bus-terminal-in-angeles-city-luzon-philippines-2BP7B86.jpg", description: "Connects Mall to Bus Terminal.", mapEmbed: "https://www.google.com/maps?q=SM+City+Angeles+to+Main+Gate+to+Dau+Terminal&output=embed" },
    { name: "C-Point → Holy Angel", city: "Angeles City", image: "https://l450v.alamy.com/450v/jmnehf/jeepney-and-passengers-angeles-city-pampanga-philippines-jmnehf.jpg", description: "Route for students going to Holy Angel University.", mapEmbed: "https://www.google.com/maps?q=Checkpoint+to+Hensonville+to+Holy+Angeles+City&output=embed" },
    { name: "Sapang Bato → Angeles", city: "Angeles City", image: "https://scontent.fcrk1-4.fna.fbcdn.net/v/t1.6435-9/90457060_3087987011220709_891397299526172672_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFzX3JMc9Mv1FozMx8ORYEKhItJnWuFYeKEi0mda4Vh4v1HxceeNI4kLLoLoP9F--8buZhaaYDDeqhlCUH5QgAY&_nc_ohc=Nfa_vgh2EeoQ7kNvwHiVlH9&_nc_oc=AdmqtQzGs-I1vZaA9EYSpMs9Xx5K2QaNviWkgt90EVT1Q8EU8GMNaa2T-i4JcfJ-r-o&_nc_zt=23&_nc_ht=scontent.fcrk1-4.fna&_nc_gid=_N7O56dRDuv_w4eh4-fAEw&oh=00_AfgS6Nn13BKgMBx95MnMzmgfQqY26MX9-_EILzCKjDT7Yw&oe=69472593", description: "Route connecting Sapang Bato to downtown Angeles City.", mapEmbed: "https://www.google.com/maps?q=Sapang+Bato+to+Angeles+City&output=embed" },
   
    { name: "Marisol → Pampang", city: "Angeles City", image: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/0373jfMagalang_Road_Pandan%2C_Mining%2C_Salapungan_Santo_Cristo%2C_Angeles_Cityfvf_37.jpg/2560px-0373jfMagalang_Road_Pandan%2C_Mining%2C_Salapungan_Santo_Cristo%2C_Angeles_Cityfvf_37.jpg", description: "Neighborhood route connecting Marisol to Pampang.", mapEmbed: "https://www.google.com/maps?q=Marisol+to+Pampang+Angeles+City&output=embed" },
    { name: "Pandang → Pampang", city: "Angeles City", image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/09881jfMarquee_Mall_Pedestrian_footbridge_Transport_Angeles_City_Roads_Pampangafvf_38.jpg", description: "Direct route between Pandang and Pampang areas.", mapEmbed: "https://www.google.com/maps?q=Pandang+to+Pampang+Angeles+City&output=embed" },
    { name: "Sunset → Nepo", city: "Angeles City", image: "https://scontent.fcrk1-1.fna.fbcdn.net/v/t1.6435-9/83909848_173261440686253_1669938406295076864_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeHPHF8KTU15S8zanCZa5XYQFrGas6O6jfUWsZqzo7qN9ebIeGUhLL7rKX1PSjVxbaGX4adb_-7yqc-kHe8F6GRI&_nc_ohc=jtKTK5qsyCAQ7kNvwH1IH2A&_nc_oc=AdlvCQxRVv2iHg0G6XcXtnzyPY4byCehsTkhPCvjcHYz02za1DdngBbom2zrg4X9Hsw&_nc_zt=23&_nc_ht=scontent.fcrk1-1.fna&_nc_gid=9WVdPf7M3V0BVrSVkzLpHg&oh=00_AfjsaDsXS9sHUzro1phOa1BbCzZUezI1kSmB1aS4QMrscQ&oe=6947211B", description: "Quick route from Sunset to Nepo area.", mapEmbed: "https://www.google.com/maps?q=Sunset+to+Nepo+Angeles+City&output=embed" },
    { name: "Villa → Pampang", city: "Angeles City", image: "https://upload.wikimedia.org/wikipedia/commons/2/24/0673jfSanto_Domingo%2C_Angeles_City%2C_Pampanga_Jeep_Transport_Terminalfvf_13.jpg", description: "Extended route reaching Villa, Pampang, and SM Telabastagan.", mapEmbed: "https://www.google.com/maps?q=Villa+to+Pampang+to+SM+Telabastagan&output=embed" }
  ];

  // 6. NEWS
  const news = [
    { name: "Masantol villages under water", image: "https://www.manilatimes.net/manilatimes/uploads/images/2025/11/10/820377.jpg", description: "Flooding due to high tide affects 39 villages.", link: "news/1" },
    { name: "Mayor suspended for 90 days", image: "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1Q3ES2.img?w=686&h=392&m=4&q=89", description: "San Simon Mayor suspended over charges.", link: "news/2" },
    { name: "No casualties in Pampanga", image: "https://media.assettype.com/sunstar/2025-11-10/ap74g4p1/PAMP.jpg", description: "Zero casualties reported after typhoon.", link: "news/3" },
    { name: "Classes suspended", image: "https://mb.com.ph/manilabulletin/uploads/images/2025/11/09/56886.webp", description: "Governor suspends classes due to storm.", link: "news/4" },
    { name: "Teen dies after group clash", image: "https://images.gmanews.tv/regionaltv2023/content_images/article/1a6s5d1_2025_10_29_19_09_39.png", description: "Tragic incident in Floridablanca.", link: "news/7" },
    { name: "New Tech City in Pampanga", image: "https://bilyonaryo.com/wp-content/uploads/2022/10/Dennis-Anthony-Uy-Converge.jpg", description: "Converge ICT to build $2B tech hub.", link: "news/5" },
    { name: "Rockwell launches The Aurelio", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7aIQKpxAaa5uMS8baIy73kPeoXKk8BQazyw&s", description: "New upscale condo in Nepo Center.", link: "news/6" },
    { name: "Clark Sports Tourism Forum", image: "https://media.assettype.com/sunstar/2025-11-07/cuet5hln/SPORT.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true", description: "Gathering leaders to boost sports tourism.", link: "news/8" },
    { name: "VG Delta inaugurates hall", image: "https://pampanganewsnow.com/wp-content/uploads/2025/11/1000066640.jpg", description: "New facilities in Apalit.", link: "news/9" },
    { name: "Judo athletes bring honor", image: "https://media.assettype.com/sunstar/2025-10-29/r9a61we0/JUDO.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true", description: "Pampanga athletes win medals.", link: "news/10" }
  ];

  // =======================================================
  //                 RENDERING & FILTERING LOGIC
  // =======================================================

  // 1. RENDER MUNICIPALITIES (PILL LAYOUT)
  const muniList = document.getElementById("muni-list");
  if(muniList) {
      muniList.innerHTML = "";
      municipalities.sort((a,b)=>a.name.localeCompare(b.name));
      municipalities.forEach(m => {
        const card = document.createElement("div");
        card.className = "muni-card";
        card.style.backgroundImage = `url('${m.image || ''}')`;
        card.innerHTML = `<span>${m.name}</span>`;
        card.addEventListener("click", ()=>openDetail(m));
        muniList.appendChild(card);
      });
  }

  // --- Function to Render BIG IMAGE CARDS ---
  function renderBigCards(containerId, data) {
    const container = document.getElementById(containerId);
    if(!container) return;
    container.innerHTML = ""; 
    
    data.forEach(item => {
      const card = document.createElement("div");
      card.className = "big-image-card";
      card.style.backgroundImage = `url('${item.image || ''}')`;
      card.innerHTML = `<span>${item.name}</span>`;
      
      card.addEventListener("click", ()=>openDetail(item));
      container.appendChild(card);
    });
  }

  // --- Function to Populate City Filter Dropdown ---
  function populateCityFilter(filterId, data) {
    const filter = document.getElementById(filterId);
    if(!filter) return;

    // Get unique cities
    const cities = [...new Set(data.map(item => item.city))].sort();
    
    cities.forEach(city => {
      const option = document.createElement("option");
      option.value = city;
      option.textContent = city;
      filter.appendChild(option);
    });
  }
  // =======================================================
  //  AUTHENTICATION LOGIC (Login / Register / Forgot)
  // =======================================================
  
  // 1. Switch between Forms
  function switchForm(type) {
    const loginForm = document.getElementById('loginForm');
    const regForm   = document.getElementById('registerForm');
    const forgotForm= document.getElementById('forgotForm');

    // Hide all first
    loginForm.style.display = 'none';
    regForm.style.display   = 'none';
    forgotForm.style.display= 'none';

    // Show selected
    if(type === 'login') loginForm.style.display = 'block';
    if(type === 'register') regForm.style.display = 'block';
    if(type === 'forgot') forgotForm.style.display = 'block';
  }

  document.addEventListener("DOMContentLoaded", () => {
    // Clear session on load (forces login every refresh, as per your original code)
    sessionStorage.clear();
    
    const overlay = document.getElementById('loginOverlay');
    const phoneShell = document.querySelector('.phone-shell');

    // Initial State
    if(overlay) overlay.style.display = 'flex';
    if(phoneShell) phoneShell.classList.add('app-hidden');

    // --- A. REGISTER LOGIC ---
    const regForm = document.getElementById('registerForm');
    regForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('regUser').value.trim();
      const pass = document.getElementById('regPass').value.trim();

      if(user === "" || pass === "") {
        alert("Please fill in all fields.");
        return;
      }

      // Check if user exists in localStorage
      if(localStorage.getItem('user_' + user)) {
        alert("Username already taken!");
        return;
      }

      // Save to LocalStorage (Database simulation)
      localStorage.setItem('user_' + user, pass);
      alert("Registration Successful! Please Log In.");
      
      // Clear inputs and switch to login
      document.getElementById('regUser').value = "";
      document.getElementById('regPass').value = "";
      switchForm('login');
    });

    // --- B. LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('loginUser').value.trim();
      const pass = document.getElementById('loginPass').value.trim();

      // Check LocalStorage
      const storedPass = localStorage.getItem('user_' + user);

      if(storedPass === pass) {
        // Success
        overlay.style.display = 'none';
        phoneShell.classList.remove('app-hidden');
        alert("Welcome back, " + user + "!");
      } else {
        // Fail
        alert("Invalid Username or Password.");
      }
    });

    // --- C. FORGOT PASSWORD LOGIC ---
    const forgotForm = document.getElementById('forgotForm');
    forgotForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const user = document.getElementById('forgotUser').value.trim();
      
      const storedPass = localStorage.getItem('user_' + user);

      if(storedPass) {
        // Since we have no email server, we alert the password (simulated recovery)
        alert("Your password is: " + storedPass);
        switchForm('login');
      } else {
        alert("Username not found.");
      }
    });
  });

  // --- Setup Filter Logic ---
  function setupFilter(filterId, containerId, allData) {
    const filter = document.getElementById(filterId);
    if(!filter) return;

    filter.addEventListener("change", (e) => {
      const selectedCity = e.target.value;
      let filteredData = allData;
      
      if(selectedCity !== 'all') {
        filteredData = allData.filter(item => item.city === selectedCity);
      }
      
      renderBigCards(containerId, filteredData);
    });
  }

  // Helper function for standard cards (Routes, News, Attractions)
  function renderStandardList(listId, dataArray) {
    const container = document.getElementById(listId);
    if(container && dataArray) {
      container.innerHTML = "";
      dataArray.forEach(item => {
        const card = document.createElement("div");
        card.className = "card"; 
        card.innerHTML = `<div class="thumb" style="background-image:url(${item.image || ''})"></div>
                          <div class="meta"><h3>${item.name}</h3><p class="muted">${(item.description||'').slice(0,60)}...</p></div>`;
        card.addEventListener("click", ()=>openDetail(item));
        container.appendChild(card);
      });
    }
  }

  // 2. RENDER ATTRACTIONS (Standard)
 if(attractions && attractions.length > 0) {
    populateCityFilter("attractions-city-filter", attractions);
    renderBigCards("attractions-list", attractions);
    setupFilter("attractions-city-filter", "attractions-list", attractions);
  }

  // 3. RENDER FOODS (Big Cards + Filter)
  if(foods && foods.length > 0) {
    populateCityFilter("food-city-filter", foods);
    renderBigCards("foods-list", foods);
    setupFilter("food-city-filter", "foods-list", foods);
  }

  // 4. RENDER LODGING (Big Cards + Filter)
  if(lodging && lodging.length > 0) {
    populateCityFilter("lodging-city-filter", lodging);
    renderBigCards("lodging-list", lodging);
    setupFilter("lodging-city-filter", "lodging-list", lodging);
  }

  // 5. RENDER ROUTES (Standard)
 // 5. RENDER ROUTES (Now Big Cards + Filter)
  if(routes && routes.length > 0) {
    populateCityFilter("routes-city-filter", routes);
    renderBigCards("routes-list", routes);
    setupFilter("routes-city-filter", "routes-list", routes);
  }

  // 6. RENDER NEWS (Standard)
  renderStandardList("news-list", news);

  // Fun Fact
  const ffText = document.getElementById('funFactText');
  if(ffText) ffText.textContent = "For two years, Pampanga was once the capital of the Philippines (1762-1764).";

});