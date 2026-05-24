import { motion } from 'framer-motion';

import { Container } from '@/components/layout/Container';
import { SectionShell } from '@/components/layout/SectionShell';
import { useTheme } from '@/components/theme/ThemeProvider';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { skillGroups } from '@/data/portfolio';
import { useDeviceProfile } from '@/hooks/use-device-profile';

export function SkillsSection() {
  const { allowViewportMotion } = useDeviceProfile();
  const { resolvedTheme } = useTheme();
  const skillTrackClass =
    resolvedTheme === 'light' ? 'bg-slate-900/8' : 'bg-white/8';
  const skillFillClass =
    resolvedTheme === 'light'
      ? 'bg-gradient-to-r from-[#0d9488] via-[#14b8a6] to-[#0ea5e9] shadow-[0_0_0_1px_rgba(13,148,136,0.08)]'
      : 'bg-gradient-to-r from-cyan-100 via-white/90 to-cyan-200';

  return (
    <SectionShell id="skills">
      <Container className="space-y-12">
        <SectionHeading
          description="The stack matters, but what recruiters usually infer is whether the engineer can shape a system, sweat the details, and still make delivery feel calm."
          eyebrow="Technical Skills"
          title={`Modern frontend depth with production AI range
to carry end-to-end AI product work.`}
        />

        <div className="grid gap-5 lg:grid-cols-3">
          {skillGroups.map((group, groupIndex) => (
            <Reveal
              className="surface rounded-[2rem] p-6 sm:p-7"
              delay={groupIndex * 0.06}
              key={group.title}
            >
              <p className="text-xs uppercase tracking-[0.35em] text-white/42">
                {group.title}
              </p>
              <p className="mt-3 text-lg leading-7 text-white/76">{group.summary}</p>
              <div className="mt-8 space-y-5">
                {group.skills.map((skill, skillIndex) => (
                  <div key={skill.label}>
                    <div className="mb-2 flex items-center justify-between text-sm">
                      <span className="text-white/72">{skill.label}</span>
                      <span className="text-white/38">{skill.level}%</span>
                    </div>
                    <div className={`h-1.5 overflow-hidden rounded-full ${skillTrackClass}`}>
                      {allowViewportMotion ? (
                        <motion.div
                          className={`h-full rounded-full ${skillFillClass}`}
                          initial={{ width: 0 }}
                          transition={{
                            delay: groupIndex * 0.08 + skillIndex * 0.05,
                            duration: 0.8,
                            ease: [0.22, 1, 0.36, 1],
                          }}
                          viewport={{ once: true }}
                          whileInView={{ width: `${skill.level}%` }}
                        />
                      ) : (
                        <div
                          className={`h-full rounded-full ${skillFillClass}`}
                          style={{ width: `${skill.level}%` }}
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </SectionShell>
  );
}
