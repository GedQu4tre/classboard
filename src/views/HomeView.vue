<!-- This example requires Tailwind CSS v2.0+ -->
<template>
    <div class="bg-white">
      <!-- header -->
        
      <main>
        <!-- Hero Card -->
        <HeroCard></HeroCard>
        <FeaturesSection></FeaturesSection>
        <OurPricing></OurPricing>
        <CTASection></CTASection>
        <TeamSection></TeamSection>
        <TestimonialSection></TestimonialSection>
        <ContactSection></ContactSection>
        <FooterSection></FooterSection>
        <!-- More main page content here... -->
      </main>
    </div>
  </template>

<script>
import HeroCard from '../components/HeroCard.vue';
import FeaturesSection from '../components/FeaturesSection.vue';
import OurPricing from '../components/OurPricing.vue';
import ContactSection from '../components/ContactSection.vue'
import CTASection from '../components/CTASection.vue';
import TeamSection from '../components/TeamSection.vue';
import TestimonialSection from '../components/TestimonialSection.vue'
import FooterSection from '../components/FooterSection.vue'
export default {
    components: { HeroCard, FeaturesSection ,OurPricing, CTASection, TeamSection, ContactSection, FooterSection, TestimonialSection},
    name: 'HomeView',
    data() {
        return {
            menus: [
                {
                    id: 1,
                    name: 'Nos prix',
                    active: true,
                }, {
                    id: 2,
                    name: 'Nos services',
                    active: false
                }
            ]
        }
    }
}
</script>