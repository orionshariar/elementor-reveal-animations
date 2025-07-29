<?php
if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Elementor_Gsap_Animation_Control extends \Elementor\Base_Control {

    public function get_type() {
        return 'gsap_animation';
    }

    public function enqueue() {
        // Enqueue control scripts/styles if needed
    }

    protected function get_default_settings() {
        return [
            'label' => __('Gsap Animation', 'plg-gsap-animations'),
            'options' => [
                'gsap-reveal-me' => __('Reveal Me', 'plg-gsap-animations'),
                'gsap-reveal-text' => __('Reveal Text', 'plg-gsap-animations'),
                'gsap-text-appear' => __('Text Appear', 'plg-gsap-animations'),
            ],
            'separator' => 'before',
        ];
    }

    public function content_template() {
        ?>
        <div class="elementor-control-field">
            <label class="elementor-control-title">{{{ data.label }}}</label>
            <div class="elementor-control-input-wrapper">
                <select class="elementor-gsap-animation-select">
                    <# _.each(data.options, function(option_title, option_value) { #>
                        <option value="{{ option_value }}">{{{ option_title }}}</option>
                    <# }); #>
                </select>
            </div>
        </div>
        <# if (data.description) { #>
            <div class="elementor-control-field-description">{{{ data.description }}}</div>
        <# } #>
        <?php
    }
}