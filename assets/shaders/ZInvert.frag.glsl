#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform sampler2D u_tex0;

void main(void)
{
    vec2 p = -1.0 + 2.0 * gl_FragCoord.xy / u_resolution.xy;
    vec2 uv;

	float time = u_time * u_speed;

    float a = atan(p.y,p.x);
    float r = sqrt(dot(p,p));

    uv.x = cos(0.6+time) + cos(cos(1.2+time)+a)/r;
    uv.y = cos(0.3+time) + sin(cos(2.0+time)+a)/r;

    vec3 col =  texture2D(u_tex0,uv*.25).xyz;

    gl_FragColor = vec4(col*r*r,1.0);
}